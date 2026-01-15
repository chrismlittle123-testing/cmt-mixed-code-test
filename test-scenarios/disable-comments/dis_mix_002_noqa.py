"""
DIS-MIX-002: noqa in Python
This file contains noqa comments that should be detected
"""

import os  # noqa: F401
import sys  # noqa

# This line is too long but we're ignoring it with noqa
very_long_variable_name_that_exceeds_the_line_length_limit = "this is a very long string that should trigger a line length warning"  # noqa: E501

unused_variable = "this is unused"  # noqa: F841


def function_with_noqa():
    """A function with noqa comments."""
    x = 1  # noqa
    return None
