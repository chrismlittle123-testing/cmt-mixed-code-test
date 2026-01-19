# Edge cases for disable comment detection

# NOQA - uppercase
# noQa - mixed case
# Noqa - title case

import os  #noqa (no space after #)
import sys  #    noqa (extra spaces)
import re  # noqa:F401 (no space after colon)
import json  # noqa : F401 (space around colon)

# type:ignore (no spaces)
# type : ignore (extra spaces)
# TYPE: IGNORE (uppercase)

# fmt:off
# fmt :off (space before colon)
# FMT: OFF (uppercase)

# pylint:disable (no space after colon)
# PYLINT: DISABLE=all (uppercase)
