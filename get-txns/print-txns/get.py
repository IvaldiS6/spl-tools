import requests

headers = {
    # Already added when you pass json= but not when you pass data=
    # 'Content-Type': 'application/json',
}

json_data = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getSignaturesForAddress",
    "params": [
      "ADDRESS",
      {
        "limit": 1
      }
    ]
  }

response = requests.post('http://api.mainnet-beta.solana.com', headers=headers, json=json_data)

with open('txns.json', 'wb') as f:
    f.write(response.content)