---
url: "https://docs.glean.com/administration/protect/sensitive-findings/supported-info-types"
canonical: "https://docs.glean.com/administration/protect/sensitive-findings/supported-info-types"
title: "Supported info types"
fetched_at: "2026-09-01T13:29:14.221Z"
---
On this page

InfoTypes are predefined detectors (from Google Cloud DLP) for common sensitive data such as credit card numbers, dates of birth, SSNs, API keys, passwords, and many country‑specific identifiers.

Glean uses Google’s DLP API to run InfoType scanning for sensitive findings.

## Where they’re used[​](#where-theyre-used "Direct link to Where they’re used")

**Policies**: When you define a policy’s sensitive content, you can select InfoTypes alongside custom terms and regular expressions.

**Reports**: Sensitive content reports also support InfoTypes, in addition to terms and regex, so you can run one‑time or scheduled CSV scans based on those detectors.

## Supported info types[​](#supported-info-types "Direct link to Supported info types")

| **InfoType** | **Description** |
| --- | --- |
| ADVERTISING\_ID | Identifiers used by developers to track users for advertising purposes. These include Google Play Advertising IDs, Amazon Advertising IDs, Apple's identifierForAdvertising (IDFA), and Apple's identifierForVendor (IDFV). |
| AGE | An age measured in months or years. |
| CREDIT\_CARD\_NUMBER | A credit card number is 12 to 19 digits long. They are used for payment transactions globally. |
| CREDIT\_CARD\_TRACK\_NUMBER | A credit card track number is a variable length alphanumeric string. It is used to store key cardholder information. |
| DATE | A date. This infoType includes most date formats, including the names of common world holidays. |
| DATE\_OF\_BIRTH | A date of birth. |
| DOMAIN\_NAME | A domain name as defined by the DNS standard. |
| EMAIL\_ADDRESS | An email address identifies the mailbox that emails are sent to or from. The maximum length of the domain name is 255 characters, and the maximum length of the local-part is 64 characters. |
| ETHNIC\_GROUP | A person’s ethnic group. |
| FEMALE\_NAME | A common female name. |
| FIRST\_NAME | A first name is defined as the first part of a PERSON\_NAME. |
| GENDER | A person’s gender identity. |
| IBAN\_CODE | An International Bank Account Number (IBAN) is an internationally agreed-upon method for identifying bank accounts defined by the International Standard of Organization (ISO) 13616:2007 standard. The European Committee for Banking Standards (ECBS) created ISO 13616:2007. An IBAN consists of up to 34 alphanumeric characters, including elements such as a country code or account number. |
| HTTP\_COOKIE | An HTTP cookie is a standard way of storing data on a per website basis. This detector will find headers containing these cookies. |
| ICD9\_CODE | The International Classification of Diseases, Ninth Revision, Clinical Modification (ICD-9-CM) lexicon is used to assign diagnostic and procedure codes associated with inpatient, outpatient, and physician office use in the United States. The US National Center for Health Statistics (NCHS) created the ICD-9-CM lexicon. It is based on the ICD-9 lexicon, but provides for more morbidity detail. The ICD-9-CM lexicon is updated annually on October 1. |
| ICD10\_CODE | Like ICD-9-CM codes, the International Classification of Diseases, Tenth Revision, Clinical Modification (ICD-10-CM) lexicon is a series of diagnostic codes. The World Health Organization (WHO) publishes the ICD-10-CM lexicon to describe causes of morbidity and mortality. |
| IMEI\_HARDWARE\_ID | An International Mobile Equipment Identity (IMEI) hardware identifier, used to identify mobile phones. |
| IP\_ADDRESS | An Internet Protocol (IP) address (either IPv4 or IPv6). |
| LAST\_NAME | A last name is defined as the last part of a PERSON\_NAME. |
| LOCATION | A physical address or location. |
| MAC\_ADDRESS | A media access control address (MAC address), which is an identifier for a network adapter. |
| MAC\_ADDRESS\_LOCAL | A local media access control address (MAC address), which is an identifier for a network adapter. |
| MALE\_NAME | A common male name. |
| MEDICAL\_TERM | Terms that commonly refer to a person's medical condition or health. |
| ORGANIZATION\_NAME | A name of a chain store, business or organization. |
| PASSPORT | A passport number that matches passport numbers for the following countries: Australia, Canada, China, France, Germany, Japan, Korea, Mexico, The Netherlands, Poland, Singapore, Spain, Sweden, Taiwan, United Kingdom, and the United States. |
| PERSON\_NAME | A full person name, which can include first names, middle names or initials, and last names. |
| PHONE\_NUMBER | A telephone number. |
| STREET\_ADDRESS | A street address. |
| SWIFT\_CODE | A SWIFT code is the same as a Bank Identifier Code (BIC). It's a unique identification code for a particular bank. These codes are used when transferring money between banks, particularly for international wire transfers. Banks also use the codes for exchanging other messages. |
| TIME | A timestamp of a specific time of day. |
| URL | A Uniform Resource Locator (URL). |
| AUTH\_TOKEN | An authentication token is a machine-readable way of determining whether a particular request has been authorized for a user. This detector currently identifies tokens that comply with OAuth or Bearer authentication. |
| BASIC\_AUTH\_HEADER | A basic authentication header is an HTTP header used to identify a user to a server. It is part of the HTTP specification in RFC 1945, section 11. |
| ENCRYPTION\_KEY | An encryption key within configuration, code, or log text. |
| GCP\_CREDENTIALS | Google Cloud service account credentials. Credentials that can be used to authenticate with Google API client libraries and service accounts. |
| PASSWORD | Clear text passwords in configs, code, and other text. |
| WEAK\_PASSWORD\_HASH | A weakly hashed password is a method of storing a password that is easy to reverse engineer. The presence of such hashes often indicate that a system's security can be improved. |
| XSRF\_TOKEN | An XSRF token is an HTTP header that is commonly used to prevent cross-site scripting attacks. Cross-site scripting is a type of security vulnerability that can be exploited by malicious sites. |

### United States[​](#united-states "Direct link to United States")

| InfoType | Description |
| --- | --- |
| AMERICAN\_BANKERS\_CUSIP\_ID | An American Bankers' Committee on Uniform Security Identification Procedures (CUSIP) number is a 9-character alphanumeric code that identifies a North American financial security. |
| FDA\_CODE | The US National Drug Code (NDC) is a unique identifier for drug products, mandated in the United States by the Food and Drug Administration (FDA). |
| US\_ADOPTION\_TAXPAYER\_IDENTIFICATION\_NUMBER | A United States Adoption Taxpayer Identification Number (ATIN) is a type of United States Tax Identification Number (TIN). An ATIN is issued by the Internal Revenue Service (IRS) to individuals who are in the process of legally adopting a US citizen or resident child. |
| US\_BANK\_ROUTING\_MICR | The American Bankers Association (ABA) Routing Number (also called the transit number) is a nine-digit code. It's used to identify the financial institution that's responsible to credit or entitled to receive credit for a check or electronic transaction. |
| US\_DEA\_NUMBER | A US Drug Enforcement Administration (DEA) number is assigned to a health care provider by the US DEA. It allows the health care provider to write prescriptions for controlled substances. The DEA number is often used as a general "prescriber number" that is a unique identifier for anyone who can prescribe medication. |
| US\_DRIVERS\_LICENSE\_NUMBER | A driver's license number for the United States. Format can vary depending on the issuing state. |
| US\_EMPLOYER\_IDENTIFICATION\_NUMBER | A United States Employer Identification Number (EIN) is also known as a Federal Tax Identification Number, and is used to identify a business entity. |
| US\_HEALTHCARE\_NPI | The US National Provider Identifier (NPI) is a unique 10-digit identification number issued to health care providers in the United States by the Centers for Medicare and Medicaid Services (CMS). The NPI has replaced the unique provider identification number (UPIN) as the required identifier for Medicare services. It's also used by other payers, including commercial healthcare insurers. |
| US\_INDIVIDUAL\_TAXPAYER\_IDENTIFICATION\_NUMBER | A United States Individual Taxpayer Identification Number (ITIN) is a type of Tax Identification Number (TIN), issued by the Internal Revenue Service (IRS). An ITIN is a tax processing number only available for certain nonresident and resident aliens, their spouses, and dependents who cannot get a Social Security Number (SSN). |
| US\_PASSPORT | A United States passport number. |
| US\_PREPARER\_TAXPAYER\_IDENTIFICATION\_NUMBER | A United States Preparer Taxpayer Identification Number (PTIN) is an identification number that all paid tax return preparers must use on US federal tax returns or claims for refund submitted to the US Internal Revenue Service (IRS). |
| US\_SOCIAL\_SECURITY\_NUMBER | A United States Social Security number (SSN) is a 9-digit number issued to US citizens, permanent residents, and temporary residents. The Social Security number has effectively become the United States national identification number. |
| US\_STATE | A United States state name. |
| US\_TOLLFREE\_PHONE\_NUMBER | A US toll-free telephone number. |
| US\_VEHICLE\_IDENTIFICATION\_NUMBER | A vehicle identification number (VIN) is a unique 17-digit code assigned to every on-road motor vehicle. |

### Argentina[​](#argentina "Direct link to Argentina")

| InfoType | Description |
| --- | --- |
| ARGENTINA\_DNI\_NUMBER | An Argentine Documento Nacional de Identidad (DNI), or national identity card, is used as the main identity document for citizens. |

### Australia[​](#australia "Direct link to Australia")

| InfoType | Description |
| --- | --- |
| AUSTRALIA\_DRIVERS\_LICENSE\_NUMBER | An Australian driver's license number. |
| AUSTRALIA\_MEDICARE\_NUMBER | A 9-digit Australian Medicare account number is issued to permanent residents of Australia (except for Norfolk island). The primary purpose of this number is to prove Medicare eligibility to receive subsidized care in Australia. |
| AUSTRALIA\_PASSPORT | An Australian passport number. |
| AUSTRALIA\_TAX\_FILE\_NUMBER | An Australian tax file number (TFN) is a number issued by the Australian Tax Office for taxpayer identification. Every taxpaying entity, such as an individual or an organization, is assigned a unique number. |

### Belgium[​](#belgium "Direct link to Belgium")

| InfoType | Description |
| --- | --- |
| BELGIUM\_NATIONAL\_ID\_CARD\_NUMBER | A 12-digit Belgian national identity card number. |

### Brazil[​](#brazil "Direct link to Brazil")

| InfoType | Description |
| --- | --- |
| BRAZIL\_CPF\_NUMBER | The Brazilian Cadastro de Pessoas Físicas (CPF) number, or Natural Persons Register number, is an 11-digit number used in Brazil for taxpayer identification. |

### Canada[​](#canada "Direct link to Canada")

| InfoType | Description |
| --- | --- |
| CANADA\_BANK\_ACCOUNT | A Canadian bank account number. |
| CANADA\_BC\_PHN | The British Columbia Personal Health Number (PHN) is issued to citizens, permanent residents, temporary workers, students, and other individuals who are entitled to health care coverage in the Province of British Columbia. |
| CANADA\_DRIVERS\_LICENSE\_NUMBER | A driver's license number for each of the ten provinces in Canada. |
| CANADA\_OHIP | The Ontario Health Insurance Plan (OHIP) number is issued to citizens, permanent residents, temporary workers, students, and other individuals who are entitled to health care coverage in the Province of Ontario. |
| CANADA\_PASSPORT | A Canadian passport number. |
| CANADA\_QUEBEC\_HIN | The Québec Health Insurance Number (HIN) is issued to citizens, permanent residents, temporary workers, students, and other individuals who are entitled to health care coverage in the Province of Québec. |
| CANADA\_SOCIAL\_INSURANCE\_NUMBER | The Canadian Social Insurance Number (SIN) is the main identifier used in Canada for citizens, permanent residents, and people on work or study visas. With a Canadian SIN and mailing address, one can apply for health care coverage, driver's licenses, and other important services. |

### Chile[​](#chile "Direct link to Chile")

| InfoType | Description |
| --- | --- |
| CHILE\_CDI\_NUMBER | A Chilean Cédula de Identidad (CDI), or identity card, is used as the main identity document for citizens. |

### China[​](#china "Direct link to China")

| InfoType | Description |
| --- | --- |
| CHINA\_RESIDENT\_ID\_NUMBER | A Chinese resident identification number. |
| CHINA\_PASSPORT | A Chinese passport number. |

### Colombia[​](#colombia "Direct link to Colombia")

| InfoType | Description |
| --- | --- |
| COLOMBIA\_CDC\_NUMBER | A Colombian Cédula de Ciudadanía (CDC), or citizenship card, is used as the main identity document for citizens. |

### Denmark[​](#denmark "Direct link to Denmark")

| InfoType | Description |
| --- | --- |
| DENMARK\_CPR\_NUMBER | A Personal Identification Number (CPR, Det Centrale Personregister) is a national ID number in Denmark. It is used with public agencies such as health care and tax authorities. Banks and insurance companies also use it as a customer number. The CPR number is required for people who reside in Denmark, pay tax or own property there. |

### France[​](#france "Direct link to France")

| InfoType | Description |
| --- | --- |
| FRANCE\_CNI | The French Carte Nationale d'Identité Sécurisée (CNI or CNIS) is the French national identity card. It's an official identity document consisting of a 12-digit identification number. This number is commonly used when opening bank accounts and when paying by check. It can sometimes be used instead of a passport or visa within the European Union (EU) and in some other countries. |
| FRANCE\_NIR | The French Numéro d'Inscription au Répertoire (NIR) is a permanent personal identification number that's also known as the French social security number for services including healthcare and pensions. |
| FRANCE\_PASSPORT | A French passport number. |
| FRANCE\_TAX\_IDENTIFICATION\_NUMBER | The French tax identification number is a government-issued ID for all individuals paying taxes in France. |

### Finland[​](#finland "Direct link to Finland")

| InfoType | Description |
| --- | --- |
| FINLAND\_NATIONAL\_ID\_NUMBER | A Finnish personal identity code, a national government identification number for Finnish citizens used on identity cards, driver's licenses and passports. |

### Germany[​](#germany "Direct link to Germany")

| InfoType | Description |
| --- | --- |
| GERMANY\_DRIVERS\_LICENSE\_NUMBER | A German driver's license number. |
| GERMANY\_IDENTITY\_CARD\_NUMBER | The German Personalausweis, or identity card, is used as the main identity document for citizens of Germany. |
| GERMANY\_PASSPORT | A German passport number. The format of a German passport number is 10 alphanumeric characters, chosen from numerals 0–9 and letters C, F, G, H, J, K, L, M, N, P, R, T, V, W, X, Y, Z. |
| GERMANY\_TAXPAYER\_IDENTIFICATION\_NUMBER | An 11-digit German taxpayer identification number assigned to both natural-born and other legal residents of Germany for the purposes of recording tax payments. |
| GERMANY\_SCHUFA\_ID | A German Schufa identification number. Schufa Holding AG is a German credit bureau whose aim is to protect clients from credit risk. |

### Hong Kong[​](#hong-kong "Direct link to Hong Kong")

| InfoType | Description |
| --- | --- |
| HONG\_KONG\_ID\_NUMBER | The 香港身份證, or Hong Kong identity card (HKIC), is used as the main identity document for citizens of Hong Kong. |

### India[​](#india "Direct link to India")

| InfoType | Description |
| --- | --- |
| INDIA\_AADHAAR\_INDIVIDUAL | The Indian Aadhaar number is a 12-digit unique identity number obtained by residents of India, based on their biometric and demographic data. |
| INDIA\_GST\_INDIVIDUAL | The Indian GST identification number (GSTIN) is a unique identifier required of every business in India for taxation. |
| INDIA\_PAN\_INDIVIDUAL | The Indian Personal Permanent Account Number (PAN) is a unique 10-digit alphanumeric identifier used for identification of individuals—particularly people who pay income tax. It's issued by the Indian Income Tax Department. The PAN is valid for the lifetime of the holder. |

### Indonesia[​](#indonesia "Direct link to Indonesia")

| InfoType | Description |
| --- | --- |
| INDONESIA\_NIK\_NUMBER | An Indonesian Single Identity Number (Nomor Induk Kependudukan, or NIK) is the national identification number of Indonesia. The NIK is used as the basis for issuing Indonesian resident identity cards (Kartu Tanda Penduduk, or KTP), passports, driver's licenses and other identity documents. |

### Italy[​](#italy "Direct link to Italy")

| InfoType | Description |
| --- | --- |
| ITALY\_FISCAL\_CODE | An Italy fiscal code number is a unique 16-digit code assigned to Italian citizens as a form of identification. |

### Japan[​](#japan "Direct link to Japan")

| InfoType | Description |
| --- | --- |
| JAPAN\_BANK\_ACCOUNT | A Japanese bank account number. |
| JAPAN\_DRIVERS\_LICENSE\_NUMBER | A Japanese driver's license number. |
| JAPAN\_INDIVIDUAL\_NUMBER | The Japanese national identification number—sometimes referred to as "My Number"—is a new national ID number as of January 2016. |
| JAPAN\_PASSPORT | A Japanese passport number. The passport number consists of two alphabetic characters followed by seven digits. |

### Korea[​](#korea "Direct link to Korea")

| InfoType | Description |
| --- | --- |
| KOREA\_PASSPORT | A Korean passport number. |
| KOREA\_RRN | A South Korean Social Security number. |

### Mexico[​](#mexico "Direct link to Mexico")

| InfoType | Description |
| --- | --- |
| MEXICO\_CURP\_NUMBER | The Mexico Clave Única de Registro de Población (CURP) number, or Unique Population Registry Code or Personal Identification Code number. The CURP number is an 18-character state-issued identification number assigned by the Mexican government to citizens or residents of Mexico and used for taxpayer identification. |
| MEXICO\_PASSPORT | A Mexican passport number. |

### The Netherlands[​](#the-netherlands "Direct link to The Netherlands")

| InfoType | Description |
| --- | --- |
| NETHERLANDS\_BSN\_NUMBER | A Dutch Burgerservicenummer (BSN), or Citizen's Service Number, is a state-issued identification number that's on driver's licenses, passports, and international ID cards. |
| NETHERLANDS\_PASSPORT | A Dutch passport number. |

### Norway[​](#norway "Direct link to Norway")

| InfoType | Description |
| --- | --- |
| NORWAY\_NI\_NUMBER | Norway‘s Fødselsnummer, National Identification Number, or Birth Number is assigned at birth, or on migration into the country. It is registered with the Norwegian Tax Office. |

### Paraguay[​](#paraguay "Direct link to Paraguay")

| InfoType | Description |
| --- | --- |
| PARAGUAY\_CIC\_NUMBER | A Paraguayan Cédula de Identidad Civil (CIC), or civil identity card, is used as the main identity document for citizens. |

### Peru[​](#peru "Direct link to Peru")

| InfoType | Description |
| --- | --- |
| PERU\_DNI\_NUMBER | A Peruvian Documento Nacional de Identidad (DNI), or national identity card, is used as the main identity document for citizens. |

### Poland[​](#poland "Direct link to Poland")

| InfoType | Description |
| --- | --- |
| POLAND\_PESEL\_NUMBER | The PESEL number is the national identification number used in Poland. It is mandatory for all permanent residents of Poland, and for temporary residents staying there longer than 2 months. It is assigned to just one person and cannot be changed. |
| POLAND\_NATIONAL\_ID\_NUMBER | The Polish identity card number. is a government identification number for Polish citizens. Every citizen older than 18 years must have an identity card. The local Office of Civic Affairs issues the card, and each card has its own unique number. |
| POLAND\_PASSPORT | A Polish passport number. Polish passport is an international travel document for Polish citizens. It can also be used as a proof of Polish citizenship. |

### Portugal[​](#portugal "Direct link to Portugal")

| InfoType | Description |
| --- | --- |
| PORTUGAL\_CDC\_NUMBER | A Portuguese Cartão de cidadão (CDC), or Citizen Card, is used as the main identity, Social Security, health services, taxpayer, and voter document for citizens. |

### Singapore[​](#singapore "Direct link to Singapore")

| InfoType | Description |
| --- | --- |
| SINGAPORE\_NATIONAL\_REGISTRATION\_ID\_NUMBER | A unique set of nine alpha-numeric characters on the Singapore National Registration Identity Card. |
| SINGAPORE\_PASSPORT | A Singaporean passport number. |

### Spain[​](#spain "Direct link to Spain")

| InfoType | Description |
| --- | --- |
| SPAIN\_CIF\_NUMBER | The Spanish Código de Identificación Fiscal (CIF) was the tax identification system used in Spain for legal entities until 2008. It was then replaced by the Número de Identificación Fiscal (NIF) for natural and juridical persons. |
| SPAIN\_DNI\_NUMBER | A Spain national identity number. |
| SPAIN\_DRIVERS\_LICENSE\_NUMBER | A Spanish driver's license number. |
| SPAIN\_NIE\_NUMBER | The Spanish Número de Identificación de Extranjeros (NIE) is an identification number for foreigners living or doing business in Spain. An NIE number is needed for key transactions such as opening a bank account, buying a car, or setting up a mobile phone contract. |
| SPAIN\_NIF\_NUMBER | The Spanish Número de Identificación Fiscal (NIF) is a government identification number for Spanish citizens. An NIF number is needed for key transactions such as opening a bank account, buying a car, or setting up a mobile phone contract. |
| SPAIN\_PASSPORT | A Spanish Ordinary Passport (Pasaporte Ordinario) number. There are 4 different types of passports in Spain. This detector is for the Ordinary Passport (Pasaporte Ordinario) type, which is issued for ordinary travel, such as vacations and business trips. |
| SPAIN\_SOCIAL\_SECURITY\_NUMBER | The Spanish Social Security number (Número de Afiliación a la Seguridad Social) is a 10-digit sequence that identifies a person in Spain for all interactions with the country's Social Security system. |

### Sweden[​](#sweden "Direct link to Sweden")

| InfoType | Description |
| --- | --- |
| SWEDEN\_NATIONAL\_ID\_NUMBER | A Swedish Personal Identity Number (personnummer), a national government identification number for Swedish citizens. |
| SWEDEN\_PASSPORT | A Swedish passport number. |

### Taiwan[​](#taiwan "Direct link to Taiwan")

| InfoType | Description |
| --- | --- |
| TAIWAN\_PASSPORT | A Taiwanese passport number. |

### Thailand[​](#thailand "Direct link to Thailand")

| InfoType | Description |
| --- | --- |
| THAILAND\_NATIONAL\_ID\_NUMBER | The Thai บัตรประจำตัวประชาชนไทย, or identity card, is used as the main identity document for Thai nationals. |

### Turkey[​](#turkey "Direct link to Turkey")

| InfoType | Description |
| --- | --- |
| TURKEY\_ID\_NUMBER | A unique Turkish personal identification number, assigned to every citizen of Turkey. |

### United Kingdom[​](#united-kingdom "Direct link to United Kingdom")

| InfoType | Description |
| --- | --- |
| SCOTLAND\_COMMUNITY\_HEALTH\_INDEX\_NUMBER | The Scotland Community Health Index Number (CHI number) is a 10-digit sequence used to uniquely identify a patient within National Health Service Scotland (NHS Scotland). |
| UK\_DRIVERS\_LICENSE\_NUMBER | A driver's license number for the United Kingdom of Great Britain and Northern Ireland (UK). |
| UK\_NATIONAL\_HEALTH\_SERVICE\_NUMBER | A National Health Service (NHS) number is the unique number allocated to a registered user of the three public health services in England, Wales, and the Isle of Man. |
| UK\_NATIONAL\_INSURANCE\_NUMBER | The National Insurance number (NINO) is a number used in the United Kingdom (UK) in the administration of the National Insurance or social security system. It identifies people, and is also used for some purposes in the UK tax system. The number is sometimes referred to as NI No or NINO. |
| UK\_PASSPORT | A United Kingdom (UK) passport number. |
| UK\_TAXPAYER\_REFERENCE | A United Kingdom (UK) Unique Taxpayer Reference (UTR) number. This number, comprised of a string of 10 decimal digits, is an identifier used by the UK government to manage the taxation system. Unlike other identifiers, such as the passport number or social insurance number, the UTR is not listed on official identity cards. |

### Uruguay[​](#uruguay "Direct link to Uruguay")

| InfoType | Description |
| --- | --- |
| URUGUAY\_CDI\_NUMBER | A Uruguayan Cédula de Identidad (CDI), or identity card, is used as the main identity document for citizens. |

### Venezuela[​](#venezuela "Direct link to Venezuela")

| InfoType | Description |
| --- | --- |
| VENEZUELA\_CDI\_NUMBER | A Venezuelan Cédula de Identidad (CDI), or national identity card, is used as the main identity document for citizens. |
