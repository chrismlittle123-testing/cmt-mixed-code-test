"""
ISO-003: tsc Ignores Python
This file contains Python type errors that tsc should ignore
"""

from typing import List, Dict, Optional


def wrong_return_type(x: int) -> str:
    """Function returns wrong type - Python type checker should catch this."""
    return x  # Should return str but returns int


def wrong_argument_type() -> None:
    """Function called with wrong argument type."""
    value: str = "hello"
    result = wrong_return_type(value)  # Passing str instead of int
    print(result)


class TypeErrorClass:
    """Class with type errors."""

    def __init__(self, value: int):
        self.value: str = value  # Assigning int to str

    def get_value(self) -> int:
        return self.value  # Returning str as int


def list_type_error() -> List[int]:
    """Return wrong list type."""
    return ["a", "b", "c"]  # Returning List[str] instead of List[int]


def dict_type_error() -> Dict[str, int]:
    """Return wrong dict type."""
    return {"a": "one", "b": "two"}  # Values are str instead of int
