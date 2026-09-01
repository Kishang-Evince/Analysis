---
url: "https://docs.glean.com/administration/management/features/dns-go-links"
canonical: "https://docs.glean.com/administration/management/features/dns-go-links"
title: "DNS-based Go Links"
description: "Enable Glean Go Links on any browser or device using go.glean.com or a custom domain, without the browser extension."
fetched_at: "2026-09-01T13:29:08.952Z"
---
On this page

In addition to using Glean's [browser extension](/administration/management/features/browser/about#go-links) to enable Go Links, you can use Glean's DNS-based Go Links solution. This lets your users use Go Links on any browser or mobile device (via a fully qualified domain name) without installing the browser extension.

## Glean sign-in[​](#glean-sign-in "Direct link to Glean sign-in")

Glean is protected by SSO authentication. If a user hasn't already signed in to Glean in a given browser, they must sign in before accessing the first Go Link they navigate to.

## Options overview[​](#options-overview "Direct link to Options overview")

You can use either **go.glean.com** directly or a custom domain to host your Go Links. The following table summarizes what each option requires:

| Domain | Example URLs | Tasks |
| --- | --- | --- |
| `go.glean.com` | `https://go.glean.com/link` | Configure the search domain to `glean.com` |
| Custom domain | `go/link`  
`http://go/link`  
`https://<custom domain>/link` | Configure the search domain to the custom domain  
Configure DNS records  
Optionally, configure Go Links redirections |

## Use go.glean.com[​](#use-gogleancom "Direct link to Use go.glean.com")

You can access your Go Links from any device using Glean's fully qualified domain name (FQDN) **go.glean.com** without any further configuration. When a user types a URL in the format `go.glean.com/<link>` in any browser they've used to sign in to Glean, they're redirected to the target.

### Configure search domains[​](#configure-search-domains "Direct link to Configure search domains")

You can configure a [search domain](https://en.wikipedia.org/wiki/Search_domain) of `glean.com` on your users' devices, which lets them use the short URLs `go/<link>`. In an enterprise environment, you can configure the search domain in several ways:

-   The [DHCP domain search option](https://datatracker.ietf.org/doc/html/rfc3397) (consult your vendor's documentation for how to set this up in your environment)
-   A desktop management framework such as [Jamf](https://www.jamf.com/)

For example, a Jamf administrator can add the following to `/Library/Preferences/SystemConfiguration/preferences.plist` on macOS:

```
<key>DNS</key>  <dict>    <key>SearchDomains</key>    <array>      <string>glean.com</string>    </array>  </dict>
```

Alternatively, a Jamf administrator can use [a script](https://community.jamf.com/t5/jamf-pro/best-way-to-set-search-domain/td-p/73297) that runs `/usr/sbin/networksetup` to set up search domains.

## Use a custom domain[​](#use-a-custom-domain "Direct link to Use a custom domain")

### HTTP-only solution[​](#http-only-solution "Direct link to HTTP-only solution")

You can also configure your own domain name for accessing Glean Go Links. To set it up:

-   Create your custom domain (for example, `go.<company>.com`) and add a DNS CNAME record pointing to **go.glean.com**.
-   Add your custom domain to the search domains list, as described in [Configure search domains](#configure-search-domains).

This setup lets your users use the short URL `go/<link>` over HTTP to access Glean Go Links.

### HTTPS solution[​](#https-solution "Direct link to HTTPS solution")

If you require HTTPS, follow these steps:

1.  Set up a load balancer that redirects both HTTP and HTTPS requests from `http(s)://<custom domain>/links` to `https://app.glean.com/go/links`.
2.  Create the `<custom domain>` DNS name and add a DNS A record with the load balancer IP address.
3.  Provision an SSL certificate for `<custom domain>`.
4.  Add your custom domain to the search domains list, as described in [Configure search domains](#configure-search-domains).

You can use a cloud-based load balancer or any other redirection server. The following Terraform snippet shows how to set up the redirection using a [Google Cloud load balancer](https://cloud.google.com/load-balancing/docs/https/setting-up-url-rewrite). A full example Terraform configuration is available on request.

```
resource "google_compute_url_map" "go-links" {  name    = "go-links"  project = var.project  default_url_redirect {    host_redirect          = "app.glean.com"    https_redirect         = true    prefix_redirect        = "/go"    redirect_response_code = "FOUND"    strip_query            = false  }}
```

The load balancer can be deployed inside the same Google Cloud project used by the Glean application.

For AWS environments, the following Terraform example is equivalent. The two `data` blocks assume you're running this in the dedicated Glean AWS account, in the same region.

```
# These two data blocks assume you're running this in the dedicated Glean AWS account, using the same regiondata "aws_vpc" "glean-vpc" {  filter {    name   = "tag:Name"    values = ["glean-vpc"]  }}data "aws_subnets" "go-links-subnets" {  filter {    name   = "vpc-id"    values = [data.aws_vpc.glean-vpc.id]  }  filter {    name   = "tag:Name"    values = ["public-subnet", "public-subnet-2"]  }}resource "aws_security_group" "go-links-lb-sg" {  name   = "go-links-lb-sg"  vpc_id = data.aws_vpc.glean-vpc.id  ingress {    from_port   = 443    protocol    = "TCP"    to_port     = 443    cidr_blocks = ["0.0.0.0/0"]  }  ingress {    from_port = 0    protocol  = "-1"    to_port   = 0    self      = true  }  egress {    cidr_blocks = ["0.0.0.0/0"]    from_port   = 0    to_port     = 0    protocol    = "-1"  }}resource "aws_lb" "go-links-lb" {  name            = "go-links"  subnets         = data.aws_subnets.go-links-subnets.ids  security_groups = [aws_security_group.go-links-lb-sg.id]}resource "aws_lb_listener" "go-links-lb-listener" {  load_balancer_arn = aws_lb.go-links-lb.arn  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"  protocol          = "HTTPS"  port              = "443"  certificate_arn   = var.ssl_cert_arn # Verified SSL cert for the custom domain, imported into or created by AWS Certificate Manager  default_action {    type = "redirect"    redirect {      status_code = "HTTP_301"      host        = "app.glean.com" # Your Glean instance host      port        = "443"      path        = "/go/#{path}"    }  }}
```

## Browser support[​](#browser-support "Direct link to Browser support")

After the search domain is configured correctly, the short domain name `go` expands to an FQDN (`app.glean.com/go/<link>`) and resolves to an IP address. Browsers vary in their support for short links in the address bar:

-   FQDN URLs are supported by all browsers.
-   Explicit HTTP URLs (`http://go/<link>`) are supported by all browsers.
-   To use short links without the `http(s)` prefix on Chrome or Edge, users must enter an explicit HTTP URL (`http://go/<link>`) the first time they access a Go Link. After that, they can omit the `http://` prefix.
-   On Safari, a user must hold the Ctrl key after entering a short URL so that the browser parses `go` as a domain name instead of using the Go Link as a web search.
-   Firefox doesn't properly support short links without the `http(s)` prefix.

| Address bar URL | Chrome | Edge | Safari | Firefox |
| --- | --- | --- | --- | --- |
| `https://go.glean.com/link` or `https://<custom domain>/link` | ✅ | ✅ | ✅ | ✅ |
| `http://go/link` | ✅ | ✅ | ✅ | ✅ |
| `go/link` | ✅ | ✅ | ✅ (hold the Ctrl key when first entering the Go Link) | Becomes a search query |
