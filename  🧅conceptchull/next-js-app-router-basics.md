## Next.js App Router Basics

#### Rule 1: The app folder is your router

- Every folder you create inside _app_ automatically becomes a URL path. No config required

#### Rule 2: A folder alone is NOT a page — you need "page.tsx"

- Just creating a folder doesn't create a route. You must put a _page.tsx_ inside it.

#### Rule 3: "layout.tsx" wraps everything inside its folder

- A layout is shared UI(navbar, sidebar) that stays mounted while the page content changes.
- It never re-render on navigation

#### Rule 4: Router Groups (folderName) — organize without affecting the URL

- Wrap a folder name in () and it disappears for the next.js URL. Used only for grouping pages that share a layout.
- **Think it as a folder for you not for the browser**

#### Rule 5 Dynamic Segments [param] — variable URL parts

- wrap a folder name in [] to capture a value form the URL at runtime
- You can access it in the page component via:
  - **{params}: {params: {id: string}}**

#### Rule 6: Catch-all Segments [...slug] — match multiple segments

- Capture any number of URL segments as an array.
- Optional Catch-all [[...slug]] — same but also matches the base URL
- **Few projects use [[...sign-in]] for Clerk's auth pages for exactly this reason.**

#### Rule 7: Private folder \_folderName — invisible to the router

- Prefix any folder with the _\__ and Next.js completely ignores it as a route.
- Used for components/utilities that live close to their pages.
- If the file in the private folder is "use client" it will be exposed to the browser.

#### Rule 8: Special reserved file names

| File          | What it does                                            |
| ------------- | ------------------------------------------------------- |
| page.tsx      | The UI shown at that URL                                |
| layout.tsx    | Persistent wrapper around child pages                   |
| loading.tsx   | Shown automatically while the page is fetching          |
| error.tsx     | Shown when the page throws an error                     |
| not-found.tsx | Custom 404 page                                         |
| route.ts      | Creates an API endpoint (like an Express route handler) |

#### Rule 9: Server Component by default

- Every component in the App Router is a _Server Component_ by default — it runs on the server, never ships its logic to the browser.
- If you need interactivity (state, events, browser API's), add "use client" at the very top of the file

#### Rule 10: Server Actions "use server"

- Functions marked with the "use server" run exclusively on the server, but can be called directly form client components ( like a form submit button click )
