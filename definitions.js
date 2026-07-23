{
    "users": [
        {
            "name": "admin",
            "password_hash": "senha123",
            "hashing_algorithm": "rabbit_password_hashing_sha256",
            "tags": ["administrator"]
        }
    ],
        "vhosts": [
            {
                "name": "/"
            }
        ],
            "permissions": [
                {
                    "user": "admin",
                    "vhost": "/",
                    "configure": ".*",
                    "write": ".*",
                    "read": ".*"
                }
            ]
}