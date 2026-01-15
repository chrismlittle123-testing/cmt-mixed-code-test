"""
Helper functions for Python module.
"""

from datetime import datetime
from typing import List
import re


def format_date(date: datetime) -> str:
    """Format a datetime object to ISO date string."""
    return date.strftime("%Y-%m-%d")


def calculate_sum(numbers: List[int]) -> int:
    """Calculate the sum of a list of numbers."""
    return sum(numbers)


def capitalize(text: str) -> str:
    """Capitalize the first letter of a string."""
    if not text:
        return text
    return text[0].upper() + text[1:].lower()


def is_valid_email(email: str) -> bool:
    """Check if an email address is valid."""
    email_regex = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
    return bool(re.match(email_regex, email))


def generate_id() -> str:
    """Generate a random ID string."""
    import random
    import string

    return "".join(random.choices(string.ascii_lowercase + string.digits, k=12))
