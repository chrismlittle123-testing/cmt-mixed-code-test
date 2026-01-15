"""
NAM-MIX-001: Correct snake_case Python file
This file follows the snake_case naming convention for Python
"""


class MyModule:
    """A sample module class."""

    def __init__(self, name: str):
        self.name = name

    def get_name(self) -> str:
        return self.name


def create_my_module(name: str) -> MyModule:
    """Create a new MyModule instance."""
    return MyModule(name)
