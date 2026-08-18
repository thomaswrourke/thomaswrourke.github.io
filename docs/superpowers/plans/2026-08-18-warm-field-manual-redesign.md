# Warm Field Manual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Thomas W. Rourke author site and OUTSMART AI AT WORK companion experience into a warmer, more empathetic, slightly subversive US-business field manual with Amazon integration, a private 60-second diagnostic, and first-class printable worksheets.

**Architecture:** Keep the site static and dependency-free on GitHub Pages. Shared visual behavior lives in `assets/styles.css`; toolkit/checkup/print/local-storage behavior lives in `assets/toolkit.js`; the three existing HTML pages remain the primary surfaces. All calculations and persistence stay client-side, with no remote submission or analytics payload.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, browser `localStorage`, `window.print()`, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-08-18-warm-field-manual-redesign.md`

## Global Constraints

- Preserve a warm cream / near-black editorial identity with brick red and dark green accents.
- Tone: empathetic, useful, slightly subversive, calm, US-business credible.
- No partisan, anti-capitalist, anti-employer, panic, conspiracy, guaranteed-outcome, or fake-urgency framing.
- Amazon CTA URL must be exactly `https://www.amazon.com/dp/B0H9SF368X` and open in a new tab with `rel="noopener noreferrer"`.
- No backend, framework, build tool, database, third-party form provider, email gate, or remote storage.
- Diagnostic, calculators, ledgers, and save features must not transmit reader data.
- Major tools must support section-specific printing on US Letter, blank printing, answered printing, reset, and local save where useful.
- Toolkit remains optional; the book remains complete without it.
- GitHub Pages paths must work from `https://thomaswrourke.github.io/`.

---

### Task 1: Shared Warm Field Manual visual system

**Files:**
- Modify: `assets/styles.css`
- Test: browser desktop 1440px, tablet 768px, mobile 390px; print preview US Letter

**Interfaces:**
- Produces reusable classes: `.field-note`, `.manifesto-line`, `.route-card`, `.route-grid`, `.amazon-cta`, `.checkup-shell`, `.checkup-question`, `.checkup-result`, `.worksheet`, `.worksheet-controls`, `.privacy-note`, `.print-only`, `.screen-only`, `.soft-band`, `.number-badge`.
- Produces print behavior keyed by `body.printing-worksheet` and `[data-print-target]`.

- [ ] **Step 1: Extend the color and spacing system**

Add variables without removing the existing palette:

```css
:root{
  --paper-bright:#faf6ed;
  --paper-warm:#f0e7d8;
  --brick:#9a4937;
  --brick-dark:#713326;
  --forest:#28463f;
  --forest-soft:#dfe8e1;
  --sun:#e0b35c;
  --shadow:0 16px 40px rgba(36,28,20,.08);
  --radius:18px;
}
```

Make hero sections less austere using soft background bands, modest shadows, rounded field-note cards, stronger vertical rhythm, and more generous mobile spacing. Preserve serif headlines and sans-serif utility text.

- [ ] **Step 2: Add reusable field-manual components**

Implement CSS for the classes listed in **Interfaces**, including hover/focus states and visible keyboard focus. `route-card` must feel inviting rather than alarming; `field-note` uses brick accent sparingly; `privacy-note` uses dark green.

- [ ] **Step 3: Implement section-specific US Letter print CSS**

Use:

```css
@page{size:Letter;margin:.55in}
@media print{
  body.printing-worksheet *{visibility:hidden!important}
  body.printing-worksheet [data-print-target].is-printing,
  body.printing-worksheet [data-print-target].is-printing *{visibility:visible!important}
  body.printing-worksheet [data-print-target].is-printing{
    position:absolute;left:0;top:0;width:100%;background:#fff;color:#111;
  }
  .screen-only{display:none!important}
  .print-only{display:block!important}
}
```

Ensure navigation, unrelated tools, decorative backgrounds and Amazon CTAs never appear in worksheet printouts.

- [ ] **Step 4: Verify visual regression manually**

Open home, book page and toolkit at 1440px, 768px and 390px. Confirm no horizontal scroll, clipped controls, illegible contrast, or broken grid. Open print preview for one worksheet and confirm US Letter layout with only the selected tool visible.

- [ ] **Step 5: Commit**

```bash
git add assets/styles.css
git commit -m "style: introduce Warm Field Manual visual system"
```

---

### Task 2: Rewrite author home and book page around reader agency

**Files:**
- Modify: `index.html`
- Modify: `outsmart-ai-at-work/index.html`

**Interfaces:**
- Consumes shared classes from Task 1.
- Produces navigation routes to `/outsmart-ai-at-work/`, `/outsmart-ai-at-work/toolkit.html`, `/outsmart-ai-at-work/toolkit.html#checkup`, and Amazon.

- [ ] **Step 1: Rewrite the author home hero**

Use this lead hierarchy:

```html
<div class="eyebrow">Technology. Institutions. Power. Practical leverage.</div>
<h1>The spreadsheet knows your salary. It probably doesn't know what happens when you disappear.</h1>
<p class="dek">Thomas W. Rourke writes for people facing decisions that look clean in a model and messier in real life. The question is not whether technology works. The question is what the model leaves out, who absorbs the cost, and what you can still change before the decision becomes official.</p>
```

Primary CTA: `Explore OUTSMART AI AT WORK`. Secondary CTA: `Get the book on Amazon` with exact supplied URL.

- [ ] **Step 2: Humanize the books and author sections**

Keep both books. Reframe cards with short field-note labels such as `WORK / AI / PAY` and `INFRASTRUCTURE / LOCAL POWER`. Avoid hype. Preserve the author territory: technology, institutions, incentives, power, practical leverage.

- [ ] **Step 3: Rewrite the OUTSMART AI AT WORK hero**

Use the approved stance:

```html
<h1 class="booktitle">You are not behind. You are being repriced.</h1>
<p class="dek">You do not need to become anti-AI. You do not need to become a coder either. You need to understand what your employer is measuring, what the model leaves out, and what you can still change before the decision becomes official.</p>
```

Keep the formal book title/subtitle visible immediately below the lead. Add CTA pair: `Open the free Companion Toolkit` and `Get the book on Amazon`.

- [ ] **Step 4: Add a Start Here block**

Add a warm `field-note` block linking to `/outsmart-ai-at-work/toolkit.html#checkup` with copy:

```text
Not sure where to start? Take the private 60-Second Job Defense Checkup. Nothing is submitted. Your answers stay in this browser.
```

- [ ] **Step 5: Reframe the 7 Walls**

Keep all seven wall names and meanings, but introduce them as `A defense system, not a panic checklist.` Add one sentence above the grid explaining that the walls are about evidence, economics, decision rights, sponsorship, compensation and adaptation.

- [ ] **Step 6: Verify all links**

Confirm the Amazon href is exactly `https://www.amazon.com/dp/B0H9SF368X`, Toolkit links resolve, and all external links use `target="_blank" rel="noopener noreferrer"`.

- [ ] **Step 7: Commit**

```bash
git add index.html outsmart-ai-at-work/index.html
git commit -m "feat: humanize author and book landing pages"
```

---

### Task 3: Add private 60-Second Job Defense Checkup and reader routing

**Files:**
- Modify: `outsmart-ai-at-work/toolkit.html`
- Modify: `assets/toolkit.js`

**Interfaces:**
- Produces `runCheckup(): void`, `routeFromConcern(targetId: string): void`, `resetCheckup(): void`.
- Checkup answers use `data-checkup-wall="1"..."7"` and values `0`, `1`, `2`.
- Result container id: `checkup_result`.

- [ ] **Step 1: Add the five concern-routing cards**

At the top of the toolkit, add heading `What are you dealing with right now?` and five buttons/cards with these routes:

```text
My role is being automated. -> #replacement
My raise or bonus is under pressure. -> #package-defense
I think a reorganization is coming. -> #threat-signals
I'm doing more work without more pay. -> #comp-brief
I use AI, but I don't want to make myself cheaper. -> #ai-value-log
```

Each card calls `routeFromConcern()` and scrolls with focus to the relevant tool.

- [ ] **Step 2: Add eight checkup questions**

Create `#checkup` with eight radio/select questions scored 0-2 and mapped to walls:

```text
1. Documentation requests are becoming more detailed or transfer-oriented. -> Wall 2
2. Important approvals or decisions have moved away from my role. -> Wall 4
3. AI or automation is now measured against my visible output. -> Wall 7
4. My responsibilities grew without a matching pay/title conversation. -> Wall 6
5. I am less included in planning, budget, or design discussions. -> Wall 2
6. A large part of my value appears only when exceptions or failures happen. -> Wall 3
7. I rely on one manager or one relationship for internal protection. -> Wall 5
8. I do not know the full multi-year compensation/career value at risk. -> Wall 1
```

- [ ] **Step 3: Implement deterministic scoring**

In `runCheckup()`, sum points per wall; highest score wins. Tie-break order: Wall 2, Wall 3, Wall 4, Wall 6, Wall 5, Wall 7, Wall 1 because early-warning and economics should lead when evidence is equal.

Map each wall to a result title, one empathetic paragraph, and three actions. Example Wall 2 result must include:

```text
Your first priority is Wall 2: See the Attack Coming.
You do not have proof that your job is disappearing. You have enough evidence that doing nothing is now the riskier choice.
```

Actions: Threat Signal Scorecard, Career Exposure Number, printable 72-hour defense plan.

- [ ] **Step 4: Add privacy behavior**

Do not call `fetch`, `XMLHttpRequest`, `sendBeacon`, third-party scripts, or remote storage. The diagnostic may exist only in DOM state; do not persist checkup answers unless explicitly triggered by a local save control.

- [ ] **Step 5: Test multiple patterns manually**

Verify: all-zero answers produce a calm low-threat result; high Wall 2 answers route to Wall 2; authority-loss answers route to Wall 4; pay/scope answers route to Wall 6; AI-output answers route to Wall 7. Confirm every action link scrolls to an existing target.

- [ ] **Step 6: Commit**

```bash
git add outsmart-ai-at-work/toolkit.html assets/toolkit.js
git commit -m "feat: add private job defense checkup and routing"
```

---

### Task 4: Make toolkit worksheets printable, editable and locally saveable

**Files:**
- Modify: `outsmart-ai-at-work/toolkit.html`
- Modify: `assets/toolkit.js`
- Modify: `assets/styles.css`

**Interfaces:**
- Produces `printWorksheet(id: string, blank: boolean): void`, `saveWorksheet(id: string): void`, `loadWorksheet(id: string): void`, `resetWorksheet(id: string): void`, `addLedgerRow(tableId: string): void`.
- Worksheet roots use `data-print-target` plus stable ids.
- Local-storage keys use prefix `rourke:outsmart:`.

- [ ] **Step 1: Wrap each major tool as a self-contained worksheet**

Assign stable ids:

```text
career-exposure
replacement
package-defense
threat-signals
exception-ledger
decision-rights
sponsor-map
ai-value-log
comp-brief
prompts
plan-90-day
plan-72-hour
```

Each worksheet includes title, one-sentence purpose, concise instructions, fields/table, disclaimer footer, and `.worksheet-controls.screen-only`.

- [ ] **Step 2: Add consistent controls**

For calculators/templates add buttons:

```html
<button onclick="printWorksheet('career-exposure',true)">Print blank worksheet</button>
<button onclick="printWorksheet('career-exposure',false)">Print with my answers</button>
<button onclick="saveWorksheet('career-exposure')">Save on this device</button>
<button onclick="resetWorksheet('career-exposure')">Clear</button>
```

Ledgers/maps also get `Add row`.

- [ ] **Step 3: Implement local save/load**

Serialize `input`, `textarea`, and `select` values within one worksheet into JSON stored under `rourke:outsmart:<worksheet-id>`. On page load, restore saved worksheets only when a stored key exists. Never store anything remotely.

- [ ] **Step 4: Implement blank and answered printing**

`printWorksheet(id, blank)` must clone current values in memory when `blank === true`, clear only the selected worksheet fields for printing, add `.is-printing` to that worksheet and `body.printing-worksheet`, call `window.print()`, then restore values and classes in an `afterprint` handler or safe timeout fallback.

- [ ] **Step 5: Implement row insertion**

`addLedgerRow(tableId)` clones the final tbody row, clears field values, removes duplicated element ids, and appends the row. Add-row must work for Exception Ledger, Decision Rights Map, Sponsor Map, and AI Value Capture Log.

- [ ] **Step 6: Add printable 72-hour defense plan**

Create a compact worksheet with three blocks:

```text
Within 24 hours: capture facts, compensation exposure, changed metrics, changed authority.
Within 48 hours: map exceptions, decision rights, stakeholders, and evidence of business consequence.
Within 72 hours: choose one conversation, one evidence package, and one option-building move.
```

Include blank lines/fields for the reader's actions and owners.

- [ ] **Step 7: Verify printing and storage**

For each major worksheet: enter sample data, save, reload page, confirm restore; print with answers; print blank; confirm unrelated sections absent; reset and confirm local-storage key removed. Verify add-row produces clean additional rows.

- [ ] **Step 8: Commit**

```bash
git add outsmart-ai-at-work/toolkit.html assets/toolkit.js assets/styles.css
git commit -m "feat: make companion worksheets printable and locally saveable"
```

---

### Task 5: Privacy copy, final QA and live GitHub Pages verification

**Files:**
- Modify: `outsmart-ai-at-work/toolkit.html`
- Modify: `README.md`

**Interfaces:**
- Consumes all prior routes and controls.
- Produces a live, documented GitHub Pages site.

- [ ] **Step 1: Add concise privacy note**

Near the checkup/toolkit top, add:

```text
Private by design. Your checkup answers, calculator inputs, and saved worksheets stay in this browser. This site does not require your name or email. Avoid entering confidential company information on any device or browser you do not control.
```

Retain educational-information disclaimer and confidentiality warning.

- [ ] **Step 2: Update README**

Document live URLs, architecture, no-backend privacy model, Amazon link, and the fact that `localStorage` is device/browser-local and can be cleared by the user.

- [ ] **Step 3: Static source audit**

Search repository HTML/JS for forbidden network/personal-data mechanisms:

```bash
grep -RInE "fetch\(|XMLHttpRequest|sendBeacon|mailto:|<form|analytics|gtag|facebook|segment" index.html outsmart-ai-at-work assets || true
```

Expected: no remote submission/analytics code. Any `<form>` used purely for local DOM grouping must have no action/method and must not submit.

- [ ] **Step 4: Link audit**

Search for Amazon URL and required toolkit anchors. Confirm no link points to `Starmaxalex`, `verityWt`, localhost, or a non-GitHub Pages path.

- [ ] **Step 5: Manual live verification**

Verify these live URLs after GitHub Pages deploys:

```text
https://thomaswrourke.github.io/
https://thomaswrourke.github.io/outsmart-ai-at-work/
https://thomaswrourke.github.io/outsmart-ai-at-work/toolkit.html
https://thomaswrourke.github.io/outsmart-ai-at-work/toolkit.html#checkup
```

Test desktop and mobile, all calculators, diagnostic, routing cards, copy buttons, local save/reset, add-row, Amazon CTA, and US Letter print preview.

- [ ] **Step 6: Commit**

```bash
git add outsmart-ai-at-work/toolkit.html README.md
git commit -m "docs: finalize privacy and live-site guidance"
```

## Self-Review

- Spec coverage: home, book page, toolkit routing, checkup, Amazon integration, privacy, printing, local save/reset, add-row, copy-ready prompts, 90-day plan, 72-hour plan, responsive layout and live verification are all assigned to explicit tasks.
- Placeholder scan: no TBD/TODO or unspecified implementation steps remain.
- Interface consistency: worksheet ids, local-storage prefix, diagnostic functions and print functions are defined once and reused consistently.
