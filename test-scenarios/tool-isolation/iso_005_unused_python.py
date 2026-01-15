"""
ISO-005: Knip Only JS/TS
This file contains unused Python exports that Knip should ignore
"""


# Unused function - Vulture should detect, Knip should ignore
def unused_function():
    """This function is never called."""
    return "unused"


# Unused class - Vulture should detect, Knip should ignore
class UnusedClass:
    """This class is never instantiated."""

    def unused_method(self):
        return "unused method"


# Unused constant - Vulture should detect, Knip should ignore
UNUSED_CONSTANT = "this constant is never used"

# Unused variable
unused_variable = "this variable is never used"


# This function is used
def used_function():
    """This function is called."""
    return "used"


# Call the used function
result = used_function()
