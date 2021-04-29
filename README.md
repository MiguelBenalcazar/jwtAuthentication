# JWT TOKEN

## ES256: ECDSA using P-256 and SHA-256

ECDSA algorithms also make use of public keys. The math behind the algorithm is different,
though, so the steps to generate the keys are different as well. The “P-256” in the name of this
algorithm tells us exactly which version of the algorithm to use (more details about this in chapter
7). We can use OpenSSL to generate the key as well:


Generate a private key (prime256v1 is the name of the parameters used to generate the key, this is the same as P-256 in the JWA spec).

openssl ecparam -name prime256v1 -genkey -noout -out ecdsa_private_key.pem

Derive the public key from the private key 


Resources:

 - https://github.com/auth0/node-jsonwebtoken

 - https://assets.ctfassets.net/2ntc334xpx65/o5J4X472PQUI4ai6cAcqg/13a2611de03b2c8edbd09c3ca14ae86b/jwt-handbook-v0_14_1.pdf

openssl ec -in ecdsa_private_key.pem -pubout -out ecdsa_public_key.pem
