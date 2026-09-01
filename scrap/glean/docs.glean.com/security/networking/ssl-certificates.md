---
url: "https://docs.glean.com/security/networking/ssl-certificates"
canonical: "https://docs.glean.com/security/networking/ssl-certificates"
title: "Add SSL certificates"
description: "Add certificate files in the Glean Admin console so Glean can trust private and on-premises services."
fetched_at: "2026-09-01T13:29:58.786Z"
---
On this page

Upload a service's certificate file in the Admin console when Glean needs to connect to and trust a private or on-premises service.

Use this page when a service uses a certificate signed by a private or internal certificate authority (CA), or when a proxy that inspects Transport Layer Security (TLS) presents a certificate that Glean does not trust by default.

note

The **SSL Certificates** tab is for certificate files used to establish TLS trust. It is not for configuring TLS client certificates or private keys. Do not upload private keys, passwords, or connector credentials.

## When to upload a certificate[​](#when-to-upload-a-certificate "Direct link to When to upload a certificate")

Upload a certificate when:

-   A connector, tool, or integration fails with an error such as `x509: certificate signed by unknown authority`.
-   Your service uses a private, internal, or self-signed CA.
-   A TLS-inspecting proxy presents a certificate signed by an internal CA.
-   Your security or Public Key Infrastructure (PKI) team has provided the certificate or certificate chain that Glean should trust.

The SSL certificate upload does not change the certificate or TLS configuration on your service. It adds the uploaded certificate files to the trusted certificate configuration used by applicable Glean services.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before using the **SSL Certificates** tab, make sure:

-   You have the **Admin** or **Super Admin** role and access to the **Admin console**.
-   Your security or PKI team has provided the certificate or certificate chain that Glean should trust.
-   You know the hostname and port of the service that Glean is connecting to.
-   You can retry the affected connector, tool, or integration after the certificate is uploaded.

## Certificate file requirements[​](#certificate-file-requirements "Direct link to Certificate file requirements")

Upload the certificate or certificates from the service's trust chain that Glean should trust when connecting to your service.

-   Use Privacy Enhanced Mail (PEM)-encoded certificate files with a `.pem` or `.crt` extension.
-   Each file must contain a PEM certificate block and no private-key block.
-   Upload a certificate from the trust chain, such as the server certificate, an intermediate CA certificate, or an internal root CA certificate.
-   Upload each certificate separately.
-   Do not upload private keys, passwords, Bag Attributes, or unrelated text.

If you are unsure which certificate to provide, ask your security or PKI team for the certificate or chain that Glean should trust when connecting to the service.

## Upload a certificate[​](#upload-a-certificate "Direct link to Upload a certificate")

1.  Sign in to the **Admin console**.
2.  Go to **Users and permissions → Network management**.
3.  Select the **SSL Certificates** tab.
4.  Select **Add SSL Certificates**.
5.  Select one or more certificate files.
6.  Select **Upload**.
7.  Confirm that the certificate filenames appear in the certificate list.

## After you upload[​](#after-you-upload "Direct link to After you upload")

Once the certificate filenames appear in the list, the upload is complete. The certificate might not take effect immediately.

Glean may need to manually process the certificate and restart or redeploy the relevant service before that service can use it.

You can retry the affected connector, tool, or integration after the certificate is uploaded. If the TLS error continues, [contact Glean Support](https://support.glean.com) and include:

-   The name of your Glean deployment.
-   The uploaded certificate filenames.
-   The affected connector, tool, or integration.
-   The target hostname and port.
-   The exact error message.
-   The approximate time of your most recent retry, including the time zone.

Support can confirm whether the certificate was processed and whether the relevant service has loaded it.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If the connection still fails after the certificate is uploaded, check the following:

-   The service hostname matches a name in the certificate’s Subject Alternative Name (SAN) field.
-   The certificate is not expired or not yet valid.
-   The service presents the expected certificate chain.
-   The uploaded certificate is part of the certificate chain presented by the service, or is a trusted CA certificate that signs that chain.
-   Each uploaded file contains valid PEM certificate blocks and no private key material.
-   A TLS-inspecting proxy is not presenting a different certificate signed by another internal CA.
-   The request is reaching the expected service and port.

To inspect the certificate chain presented by a service, ask your network or PKI team to run an equivalent of:

```
target_host="your-service.example.com" # Replace with the service hostnametarget_port=443 # Replace with the port that your service exposes for TLSecho | openssl s_client -connect "$target_host:$target_port" -servername "$target_host" -showcerts
```

The certificate chain returned by the service should correspond to the certificate or chain uploaded to Glean.

## Security considerations[​](#security-considerations "Direct link to Security considerations")

-   Upload certificate files only. Never upload a private key to the **SSL Certificates** tab.
-   Upload the narrowest certificate or trust scope that meets your connectivity requirement.
-   Coordinate certificate rotation with your security or PKI team before an existing certificate expires.
-   After rotating a certificate, test the affected connector or service and confirm that the TLS error is resolved.

## See also[​](#see-also "Direct link to See also")

-   [Admin Virtual Private Network (VPN) setup in the Glean Admin Console](/security/networking/admin-vpn-setup)
