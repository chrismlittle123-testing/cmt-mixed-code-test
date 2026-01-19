# Tests for false positive detection

# This mentions noqa but doesn't use it
# The word "noqa" appears here but shouldn't trigger

# type: ignore is mentioned in this documentation comment

def function_with_type_string():
    """Returns type: ignore as a string."""
    return "type: ignore"

def function_with_noqa_string():
    """Returns noqa in the string."""
    return "# noqa"  # Should this trigger?
