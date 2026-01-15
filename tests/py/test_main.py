"""
Tests for Python modules.
"""

import pytest
from datetime import datetime

from src.python.main import create_user, get_user_display_name, process_users, User
from src.python.helpers import format_date, calculate_sum, capitalize, is_valid_email, generate_id


class TestUserFunctions:
    """Tests for user-related functions."""

    def test_create_user(self):
        """Test creating a user with name and email."""
        user = create_user("Test User", "test@example.com")

        assert user.name == "Test User"
        assert user.email == "test@example.com"
        assert isinstance(user.id, int)
        assert isinstance(user.created_at, datetime)

    def test_get_user_display_name(self):
        """Test getting formatted display name."""
        user = User(
            id=1,
            name="John Doe",
            email="john@example.com",
            created_at=datetime.now(),
        )

        assert get_user_display_name(user) == "John Doe <john@example.com>"

    def test_process_users(self):
        """Test processing multiple users."""
        users = [
            User(id=1, name="User 1", email="user1@example.com", created_at=datetime.now()),
            User(id=2, name="User 2", email="user2@example.com", created_at=datetime.now()),
        ]

        result = process_users(users)

        assert len(result) == 2
        assert result[0] == "User 1 <user1@example.com>"
        assert result[1] == "User 2 <user2@example.com>"


class TestHelperFunctions:
    """Tests for helper functions."""

    def test_format_date(self):
        """Test formatting date to ISO string."""
        date = datetime(2024, 6, 15, 12, 0, 0)
        assert format_date(date) == "2024-06-15"

    def test_calculate_sum(self):
        """Test calculating sum of numbers."""
        assert calculate_sum([1, 2, 3, 4, 5]) == 15
        assert calculate_sum([]) == 0
        assert calculate_sum([10]) == 10

    def test_capitalize(self):
        """Test capitalizing first letter."""
        assert capitalize("hello") == "Hello"
        assert capitalize("WORLD") == "World"
        assert capitalize("") == ""

    def test_is_valid_email(self):
        """Test email validation."""
        assert is_valid_email("test@example.com") is True
        assert is_valid_email("invalid") is False
        assert is_valid_email("test@") is False

    def test_generate_id(self):
        """Test generating unique IDs."""
        id1 = generate_id()
        id2 = generate_id()

        assert isinstance(id1, str)
        assert len(id1) > 0
        assert id1 != id2
