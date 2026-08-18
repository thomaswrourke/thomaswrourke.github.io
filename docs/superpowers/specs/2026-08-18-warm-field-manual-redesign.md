# Thomas W. Rourke site redesign - Warm Field Manual

Date: 2026-08-18
Status: Approved direction, pending implementation plan

## Objective

Redesign the existing Thomas W. Rourke author site and OUTSMART AI AT WORK companion experience so it feels warmer, more useful, more human, and more memorable without becoming partisan, anti-employer, or anti-technology.

The intended voice is smart economic self-defense: empathetic to workers, skeptical of incomplete corporate models, practical about leverage, and slightly insurgent in tone without adopting activist or ideological branding.

## Core positioning

The site should speak to a reader who is worried that AI, restructuring, metrics, or compensation decisions are quietly reducing the price of their work.

Primary framing:

- You are not behind. You are being repriced.
- This is not workplace warfare. It is economic self-defense.
- Keep the technology. Keep your leverage too.
- The spreadsheet knows your salary. It probably does not know what happens when you disappear.

The author remains evidence-first and non-hysterical. The site must never imply that every employer acts maliciously, that every automation fails, or that every job can be protected.

## Audience

Primary audience: US professionals, managers, analysts, operators, sales, finance, HR, compliance, customer-service and knowledge workers who are experiencing AI adoption, reorganization, productivity pressure, compensation compression, or role redesign.

Secondary audience: readers of Thomas W. Rourke's broader work on technology, institutions, power and practical leverage.

## Visual direction

Name: Warm Field Manual.

Visual principles:

- Preserve the existing cream/ink editorial identity, but make it brighter and less austere.
- Use warm cream, near-black, brick red and dark green as the main palette.
- Increase visual rhythm through varied cards, callouts, numbered steps, field-note labels and stronger hierarchy.
- Use subtle imperfect/field-note cues rather than corporate dashboard aesthetics.
- No fists, protest imagery, flags, political iconography, dystopian AI imagery, neon tech gradients or aggressive red-alert treatment.
- Typography should feel like a serious US business book with practical workbook components.
- Mobile-first responsiveness remains mandatory.

## Information architecture

### Home page

Purpose: establish Thomas W. Rourke's author territory and route readers to the current book.

Hero concept:

"The spreadsheet knows your salary. It probably doesn't know what happens when you disappear."

Supporting copy should explain that Rourke writes about what institutions measure, what they miss, who bears the cost, and what ordinary people can still change before decisions become official.

Primary CTA: Explore OUTSMART AI AT WORK.
Secondary CTA: Get the book on Amazon.
Amazon destination supplied by the author: https://www.amazon.com/dp/B0H9SF368X

Books section: retain OUTSMART AI AT WORK and THE DATA CENTER REVOLT, but make the cards more editorial and human.

Author section: retain the established territory of technology, institutions, incentives, power and practical leverage.

### OUTSMART AI AT WORK book page

Hero should lead with reader pain and agency rather than documentation.

Suggested framing:

"You do not need to become anti-AI. You do not need to become a coder either. You need to understand what your employer is measuring, what the model leaves out, and what you can still change before the decision becomes official."

Primary CTA: Open the free Companion Toolkit.
Secondary CTA: Get the book on Amazon.

Retain the 7-Wall framework, but present it as a guided defense system rather than a technical inventory.

Add a short "Start here" block leading to the private Job Defense Checkup.

### Companion Toolkit

The toolkit should no longer read like one long technical worksheet. It should begin with a human routing question:

"What are you dealing with right now?"

Entry choices:

1. My role is being automated.
2. My raise or bonus is under pressure.
3. I think a reorganization is coming.
4. I'm doing more work without more pay.
5. I use AI, but I don't want to make myself cheaper.

Each choice should route or scroll the reader to the most relevant tools.

Existing calculators and templates remain, including:

- Career Exposure Number
- Hidden Replacement Bill
- Package Defense Comparison
- Threat Signal Scorecard
- Exception Ledger
- Decision Rights Map
- Sponsor Map
- AI Value Capture Log
- One-Page Compensation Brief
- copy-ready prompts
- 90-Day Installation Plan

## 60-Second Job Defense Checkup

Add an in-browser diagnostic that collects no personal data and sends nothing to a server.

The diagnostic should ask 7-9 simple questions about recent changes in role, authority, metrics, documentation requests, AI adoption, compensation and planning access.

Output should identify one priority wall and give three practical next actions.

Example result:

"Your first priority is Wall 2: See the Attack Coming. You do not have proof that your job is disappearing. You have enough evidence that doing nothing is now the riskier choice."

Then route the reader to:

1. Threat Signal Scorecard
2. Career Exposure Number
3. printable 72-hour defense plan

Privacy requirement: no email, name, analytics payload, form submission or remote storage is required for the diagnostic. Use only local browser state where needed.

## Printing and worksheet behavior

Printing is a first-class feature.

Every major worksheet/tool should offer:

- Print blank worksheet
- Print with my answers
- Clear/reset
- Add row where relevant
- Save locally where useful, using browser localStorage only

Print output should be US Letter 8.5 x 11, clean, high-contrast, ink-efficient and stripped of navigation, decorative blocks and unrelated sections.

Each tool should print as a self-contained worksheet with:

- title
- one-sentence purpose
- concise instructions
- fields/table
- relevant disclaimer/footer

Do not force readers to print the entire toolkit page.

## Toolkit interaction design

Calculators remain client-side only.

Add reusable controls for:

- local save/load
- reset
- row insertion for ledgers/maps
- section-specific printing
- copy-to-clipboard for prompts
- routing from the diagnostic and "what are you dealing with" cards

No backend is required.

## Tone and copy rules

Tone: highly empathetic, useful, slightly subversive, calm, American-business credible.

Allowed stance:

- workers should understand the economics used to price them
- AI may create real productivity gains
- management may make rational decisions from incomplete models
- readers should protect leverage, timing, evidence and optionality

Avoid:

- anti-capitalist or partisan language
- employer-as-enemy caricatures
- panic, doom, conspiracy framing
- guaranteed outcomes
- fake urgency timers
- manipulative fear marketing
- slogans on every screen

Strong lines should be used sparingly so they retain force.

## Amazon integration

Add "Get the book on Amazon" CTA on the author home and OUTSMART AI AT WORK page, linking to:

https://www.amazon.com/dp/B0H9SF368X

External links should open in a new tab with safe rel attributes.

## Compliance and privacy

The Companion Toolkit should remain optional and the book should remain usable without it.

No email gate is required.

No reader data should be transmitted by the diagnostic, calculators, ledgers or save feature.

Add a concise privacy note explaining that calculations and checkup answers stay in the browser unless the reader chooses to print or copy them.

Keep the existing educational-information disclaimer and confidentiality warning around company information.

## Files expected to change

- index.html
- outsmart-ai-at-work/index.html
- outsmart-ai-at-work/toolkit.html
- assets/styles.css
- assets/toolkit.js

Potential new files:

- assets/site.js if shared site interactions justify separation
- outsmart-ai-at-work/checkup.html if the diagnostic is clearer as a standalone page; otherwise keep it inside toolkit.html

YAGNI preference: keep the implementation static and dependency-free. No framework, build tool, backend, database or third-party form provider.

## Verification

Before completion:

- confirm the home, book page and toolkit render correctly on desktop and narrow mobile widths
- verify Amazon CTA href exactly matches the supplied ASIN URL
- verify all toolkit calculators still function
- verify diagnostic results and routing for multiple answer patterns
- verify local save/reset behavior
- verify add-row controls
- verify prompts copy correctly
- verify each print button prints only its intended worksheet
- verify print CSS on US Letter
- verify no personal data leaves the browser
- verify no broken relative/absolute links on GitHub Pages
- verify the live GitHub Pages URLs after deployment

## Success criteria

A reader landing from the book should feel understood within the first screen, identify the right tool without studying the whole framework, complete or print a useful worksheet in under five minutes, and leave with a clearer next action rather than a generic motivational message.

The finished site should feel like an extension of Thomas W. Rourke's author voice: analytical about power, practical about leverage, sympathetic to the reader, skeptical of incomplete models, and never melodramatic.