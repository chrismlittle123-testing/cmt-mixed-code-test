"""
DIS-MIX-004: type: ignore in Python
This file contains type: ignore comments that should be detected
"""

from typing import List


def get_user_name(user: dict) -> str:
    """Get user name with type ignore."""
    return user["name"]  # type: ignore


def process_items(items: List[str]) -> int:
    """Process items with wrong return type."""
    return items  # type: ignore[return-value]


class MyClass:
    """A class with type ignores."""

    def __init__(self):
        self.value: str = 123  # type: ignore

    def get_value(self) -> int:
        return self.value  # type: ignore


# type: ignore - File-level ignore
result: str = MyClass().get_value()
