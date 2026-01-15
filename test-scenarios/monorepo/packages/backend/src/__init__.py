"""
MONO-001: Backend Python package
Separate package in monorepo structure
"""

from .main import init_backend, handle_request

__all__ = ["init_backend", "handle_request"]
