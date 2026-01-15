"""
NAM-MIX-003: Correct snake_case folder for Python
This folder follows the snake_case naming convention
"""


def get_user_by_id(user_id: str) -> dict:
    """Get user by ID."""
    return {
        "id": user_id,
        "username": f"user_{user_id}",
        "email": f"user_{user_id}@example.com",
    }


def format_user_name(first_name: str, last_name: str) -> str:
    """Format user's full name."""
    return f"{first_name} {last_name}"
