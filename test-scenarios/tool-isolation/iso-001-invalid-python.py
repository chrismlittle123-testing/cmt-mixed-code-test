"""
ISO-001: ESLint Ignores Python
This file contains invalid Python syntax that ESLint should ignore
"""

# This is valid Python but would be invalid in other contexts
def function_with_python_syntax():
    # Python-specific syntax
    x = [i for i in range(10)]
    y = {k: v for k, v in zip(['a', 'b'], [1, 2])}

    # Python walrus operator (not valid in JS/TS)
    if (n := len(x)) > 5:
        print(f"List has {n} items")

    # Python match statement (3.10+)
    match x:
        case []:
            return "empty"
        case [first, *rest]:
            return f"first: {first}, rest: {rest}"
        case _:
            return "other"


# Decorators (Python-specific)
def decorator(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper


@decorator
def decorated_function():
    pass
