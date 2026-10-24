# Snapcircle

The Snapcircle company website is a React single-page site for Snapcircle Limited, built with Vite and Tailwind CSS 4. Its visual system is custom CSS, with light and dark themes.

## Company and initiatives

- **Snapcircle Limited** is an independent software company based in Dublin, Ireland (company number 675788).
- **finQry** is the featured initiative: cloud financial intelligence, currently in development.
- **Stratum Core** is the developing foundation behind finQry, focused on governed and explainable natural-language analytics.
- **inQry** explores AI customer support: <https://inqry.ai/>.
- **Tinycrafts** is a maker studio for focused developer tools: <https://tinycrafts.ai/>.

The website presents the company first and keeps its initiatives at their own stages. The interactive finQry preview uses local sample data and does not run queries or persist saved results.

## Development

```sh
npm install
npm run dev
```

Create a production build with `npm run build`; preview it locally with `npm run preview`.

## Deploy to GitHub Pages

The live site at <https://snapcircle.ie/> is published from the `docs/` directory on the `pages` branch. From that branch, run:

```sh
npm run deploy
```

This builds the site, copies its public files into `docs/`, commits all local site changes, and pushes `pages` to GitHub. You can provide a commit message with `npm run deploy -- "Describe the change"`. Keep `.env` and API keys out of the site; they are ignored by Git.

The Shadcn Blocks registry remains configured in `components.json` for future components. `SHADCNBLOCKS_API_KEY` is read from `.env` by the CLI and is never included in the client bundle.

## Before publishing

- Verify that `hello@snapcircle.ie` is monitored, or replace the contact address.
- Confirm DNS, HTTPS and external links after deployment.
