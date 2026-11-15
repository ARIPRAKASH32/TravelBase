from decimal import Decimal
from flask import Blueprint, jsonify, session
from sqlalchemy import func

from backend.app import db
from backend.app.models import Booking, Destination, Package, Payment, User
from backend.app.utils.permissions import role_required

admin_api_bp = Blueprint("admin_api", __name__, url_prefix="/api/admin")


@admin_api_bp.before_request
def verify_admin_session():
    if not session.get("user_id"):
        return jsonify({"error": "Authentication required"}), 401
    if session.get("role") != "admin":
        return jsonify({"error": "Admin privilege required"}), 403
    return None


@admin_api_bp.get("/stats")
def get_admin_stats():
    total_customers = User.query.filter_by(role="customer").count()
    total_packages = Package.query.count()
    total_bookings = Booking.query.count()
    confirmed_bookings = Booking.query.filter_by(booking_status="confirmed").count()
    pending_bookings = Booking.query.filter_by(booking_status="pending").count()

    total_revenue_result = (
        db.session.query(func.sum(Booking.total_amount))
        .filter(Booking.booking_status == "confirmed")
        .scalar()
    )
    total_revenue = float(total_revenue_result) if total_revenue_result else 0.0

    recent_bookings = (
        Booking.query.order_by(Booking.created_at.desc())
        .limit(6)
        .all()
    )

    recent_list = []
    for b in recent_bookings:
        recent_list.append({
            "id": b.id,
            "code": b.booking_code,
            "customer": b.customer.name if b.customer else "Unknown",
            "package": b.package.package_name if b.package else "Custom Trip",
            "date": b.travel_date.isoformat() if b.travel_date else None,
            "amount": float(b.total_amount) if b.total_amount else 0.0,
            "status": b.booking_status,
        })

    return jsonify({
        "total_customers": total_customers,
        "total_packages": total_packages,
        "total_bookings": total_bookings,
        "confirmed_bookings": confirmed_bookings,
        "pending_bookings": pending_bookings,
        "total_revenue": total_revenue,
        "recent_bookings": recent_list,
    })
