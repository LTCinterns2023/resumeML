import re
textResume = """
jrabovsk @uwo.ca  | https://www.linkedin.com/in/josh -rabovsky/  | https://github.com/joshrabovsky | (647) -220-6029  """

patterns = [
    r'\+\d\s\d{3}\s\d{3}\s\d{4}',
    r'\(\d{3}\)\s\d{3}\s\d{4}',
    r'\d{10}',
    r'\+\d\d{10}',
    r'\(\d{3}\)-\d{3}-\d{4}',
    r'\(\d{3}\)\s\d{3}-\d{4}',
    r'\d{3}\s\d{3}\s\d{4}'
    r'\d{3}-\d{3}-\d{4}',
    r'\d{3}[-\s]?\d{3}[-\s]?\d{4}',
    r'\(\d{3}\)\s-\d{3}-\d{4}'
]
for pattern in patterns:
    matches = re.findall(pattern, textResume)
    if len(matches) != 0:
        applicantNumber = matches[0]
        break