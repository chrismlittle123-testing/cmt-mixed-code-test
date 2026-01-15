"""
Main Python module for testing cross-language tool behavior.
"""

from dataclasses import dataclass
from datetime import datetime
from typing import List
import random

from .helpers import format_date, calculate_sum


@dataclass
class User:
    """User data class."""

    id: int
    name: str
    email: str
    created_at: datetime


def create_user(name: str, email: str) -> User:
    """Create a new user with the given name and email."""
    return User(
        id=random.randint(1, 1000),
        name=name,
        email=email,
        created_at=datetime.now(),
    )


def get_user_display_name(user: User) -> str:
    """Get the display name for a user."""
    return f"{user.name} <{user.email}>"


def process_users(users: List[User]) -> List[str]:
    """Process a list of users and return their display names."""
    return [get_user_display_name(user) for user in users]


if __name__ == "__main__":
    # Example usage
    test_user = create_user("John Doe", "john@example.com")
    print(f"Created user: {get_user_display_name(test_user)}")
    print(f"Formatted date: {format_date(test_user.created_at)}")
    print(f"Sum example: {calculate_sum([1, 2, 3, 4, 5])}")
