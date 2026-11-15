from decimal import Decimal
import re
from flask import Blueprint, jsonify, request, session
from sqlalchemy import func

from backend.app import db
from backend.app.models import Destination, Enquiry, Package, User

api_bp = Blueprint("api", __name__, url_prefix="/api")
EMAIL_PATTERN = re.compile(r"[^@\s]+@[^@\s]+\.[^@\s]+")


def _package_to_dict(pkg):
    return {
        "id": pkg.slug,
        "name": pkg.package_name,
        "destination": pkg.destination.name if pkg.destination else "",
        "location": pkg.destination.location if pkg.destination else "",
        "days": pkg.duration,
        "nights": pkg.nights,
        "price": float(pkg.price) if isinstance(pkg.price, Decimal) else pkg.price,
        "category": pkg.category,
        "image": pkg.image,
        "description": pkg.description,
        "includes": pkg.includes or [],
        "excludes": pkg.excludes or [],
        "hotel": pkg.hotel or "",
        "transport": pkg.transport or "",
        "itinerary": pkg.itinerary or [],
        "policy": pkg.policy or "",
        "status": pkg.status,
    }


def _destination_to_dict(dest):
    return {
        "id": dest.id,
        "name": dest.name,
        "location": dest.location,
        "description": dest.description,
        "image": dest.image,
        "package_count": len(dest.packages) if dest.packages else 0,
    }


@api_bp.get("/destinations")
def get_destinations():
    destinations = Destination.query.order_by(Destination.name.asc()).all()
    return jsonify([_destination_to_dict(d) for d in destinations])


@api_bp.get("/packages")
def get_packages():
    query = Package.query.filter_by(status="active")

    search = request.args.get("search", "").strip().lower()
    if search:
        search_filter = f"%{search}%"
        query = query.join(Package.destination).filter(
            func.lower(Package.package_name).like(search_filter)
            | func.lower(Destination.name).like(search_filter)
            | func.lower(Destination.location).like(search_filter)
        )

    category = request.args.get("category", "").strip().lower()
    if category and category != "all":
        query = query.filter(func.lower(Package.category) == category)

    max_price = request.args.get("max_price")
    if max_price:
        try:
            query = query.filter(Package.price <= float(max_price))
        except ValueError:
            pass

    max_duration = request.args.get("max_duration")
    if max_duration:
        try:
            query = query.filter(Package.duration <= int(max_duration))
        except ValueError:
            pass

    sort = request.args.get("sort")
    if sort == "low":
        query = query.order_by(Package.price.asc())
    elif sort == "high":
        query = query.order_by(Package.price.desc())
    else:
        query = query.order_by(Package.created_at.desc())

    packages = query.all()
    return jsonify([_package_to_dict(p) for p in packages])


@api_bp.get("/packages/<slug>")
def get_package_detail(slug):
    pkg = Package.query.filter_by(slug=slug).first()
    if not pkg:
        return jsonify({"error": "Package not found"}), 404
    return jsonify(_package_to_dict(pkg))


@api_bp.post("/enquiries")
def submit_enquiry():
    data = request.get_json(silent=True) or request.form.to_dict()
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip().lower()
    phone = (data.get("phone") or "").strip()
    message = (data.get("message") or "").strip()

    if not name or len(name) > 120:
        return jsonify({"error": "Name is required (max 120 characters)"}), 400
    if not EMAIL_PATTERN.fullmatch(email):
        return jsonify({"error": "A valid email address is required"}), 400
    if not message or len(message) < 5:
        return jsonify({"error": "Message is required (minimum 5 characters)"}), 400

    enquiry = Enquiry(name=name, email=email, phone=phone, message=message, status="new")
    db.session.add(enquiry)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Thank you. Your enquiry has been received and our concierge will contact you.",
        "id": enquiry.id
    }), 201


@api_bp.get("/profile")
def get_profile():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Authentication required"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone or "",
        "address": user.address or "",
        "role": user.role,
        "created_at": user.created_at.isoformat() if user.created_at else None,
    })


@api_bp.put("/profile")
def update_profile():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Authentication required"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json(silent=True) or request.form.to_dict()
    name = (data.get("name") or "").strip()
    phone = (data.get("phone") or "").strip()
    address = (data.get("address") or "").strip()

    if name:
        if len(name) > 120:
            return jsonify({"error": "Name exceeds 120 characters"}), 400
        user.name = name

    if phone:
        if len(phone) > 30:
            return jsonify({"error": "Phone exceeds 30 characters"}), 400
        user.phone = phone

    if address is not None:
        if len(address) > 255:
            return jsonify({"error": "Address exceeds 255 characters"}), 400
        user.address = address

    db.session.commit()
    return jsonify({
        "success": True,
        "message": "Profile updated successfully",
        "profile": {
            "name": user.name,
            "email": user.email,
            "phone": user.phone or "",
            "address": user.address or "",
        }
    })
