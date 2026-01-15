"""
NAM-MIX-002: WRONG - camelCase Python file (should be snake_case)
This file violates the snake_case naming convention for Python
"""


class WrongModule:
    """A sample module class with wrong naming."""

    def __init__(self, name: str):
        self.name = name

    def get_name(self) -> str:
        return self.name


def create_wrong_module(name: str) -> WrongModule:
    """Create a new WrongModule instance."""
    return WrongModule(name)
