"""
DIS-MIX-005: All Comment Types in Python
This file contains various disable comments that should all be detected
"""

import os  # noqa: F401
import sys  # noqa

# fmt: off
badly_formatted_code=1+2+3
# fmt: on

# type: ignore
wrong_type: str = 123

# pylint: disable=invalid-name
BadlyNamedVariable = "should be snake_case"
# pylint: enable=invalid-name

# pragma: no cover
def uncovered_function():
    """This function is excluded from coverage."""
    pass


# mypy: ignore-errors
class IgnoredClass:
    """Class with mypy errors ignored."""

    def __init__(self):
        self.value = "test"
