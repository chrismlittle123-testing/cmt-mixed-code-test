"""
GLK-MIX-002: Secret in Python
This file contains a hardcoded secret that should be detected by Gitleaks
"""

# This should be detected by Gitleaks
API_KEY = "sk-secret123456789abcdef"

# Another secret pattern
AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE"


def make_api_call():
    """Make an API call with the secret key."""
    import requests

    return requests.get(
        "https://api.example.com",
        headers={"Authorization": f"Bearer {API_KEY}"},
    )


def get_aws_config():
    """Get AWS configuration with the secret key."""
    return {
        "accessKeyId": AWS_ACCESS_KEY,
        "region": "us-east-1",
    }
