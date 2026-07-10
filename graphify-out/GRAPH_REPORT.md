# Graph Report - .  (2026-07-03)

## Corpus Check
- Corpus is ~7,270 words - fits in a single context window. You may not need a graph.

## Summary
- 100 nodes · 99 edges · 31 communities (10 shown, 21 thin omitted)
- Extraction: 78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Sidebar System|Sidebar System]]
- [[_COMMUNITY_Core App UI|Core App UI]]
- [[_COMMUNITY_Navigation|Navigation]]
- [[_COMMUNITY_SheetModal|Sheet/Modal]]
- [[_COMMUNITY_Sidebar State|Sidebar State]]
- [[_COMMUNITY_Menu & Tooltip|Menu & Tooltip]]
- [[_COMMUNITY_Documentation|Documentation]]
- [[_COMMUNITY_Signup Flow|Signup Flow]]
- [[_COMMUNITY_Field Labels|Field Labels]]
- [[_COMMUNITY_Separators|Separators]]
- [[_COMMUNITY_Field Component|Field Component]]
- [[_COMMUNITY_Field Content|Field Content]]
- [[_COMMUNITY_Input Components|Input Components]]
- [[_COMMUNITY_Skeleton Loading|Skeleton Loading]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_File Icon|File Icon]]
- [[_COMMUNITY_Globe Icon|Globe Icon]]
- [[_COMMUNITY_Window Icon|Window Icon]]
- [[_COMMUNITY_Dashboard Layout|Dashboard Layout]]
- [[_COMMUNITY_Dashboard Page|Dashboard Page]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_Login Page|Login Page]]
- [[_COMMUNITY_Home Page|Home Page]]
- [[_COMMUNITY_Signup Page|Signup Page]]
- [[_COMMUNITY_Field Error|Field Error]]
- [[_COMMUNITY_Field Group|Field Group]]
- [[_COMMUNITY_Field Legend|Field Legend]]
- [[_COMMUNITY_Field Set|Field Set]]
- [[_COMMUNITY_Sheet Trigger|Sheet Trigger]]
- [[_COMMUNITY_Tooltip Provider|Tooltip Provider]]

## God Nodes (most connected - your core abstractions)
1. `useSidebar` - 21 edges
2. `App Sidebar` - 8 edges
3. `cn` - 7 edges
4. `Findfee Application` - 7 edges
5. `SheetContent` - 6 edges
6. `SidebarMenuButton` - 6 edges
7. `Login Form` - 5 edges
8. `Signup Form` - 5 edges
9. `SidebarProvider` - 5 edges
10. `Button UI Component` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Collapsible UI Component` --part_of--> `Findfee Application`  [INFERRED]
  src/components/ui/collapsible.tsx → src/app/layout.tsx
- `Login Form` --semantically_similar_to--> `Signup Form`  [INFERRED] [semantically similar]
  src/components/login-form.tsx → src/components/signup-form.tsx
- `FieldSeparator` --semantically_similar_to--> `SidebarSeparator`  [INFERRED] [semantically similar]
  src/components/ui/field.tsx → src/components/ui/sidebar.tsx
- `Skeleton` --semantically_similar_to--> `SidebarMenuSkeleton`  [INFERRED] [semantically similar]
  src/components/ui/skeleton.tsx → src/components/ui/sidebar.tsx
- `Dashboard Layout` --composes--> `App Sidebar`  [EXTRACTED]
  src/app/dashboard/layout.tsx → src/components/app-sidebar.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Sidebar Navigation Composition** — src_components_app_sidebar, src_components_nav_main, src_components_nav_projects, src_components_nav_secondary, src_components_nav_user [EXTRACTED 1.00]
- **Authentication Flow** — home-page, src_app_signup_page, src_app_login_page, src_components_signup_form, src_components_login_form [INFERRED 0.85]
- **UI Component Library** — src_components_ui_avatar, src_components_ui_breadcrumb, src_components_ui_button, src_components_ui_card, src_components_ui_collapsible, src_components_ui_dropdown_menu [INFERRED 0.80]
- **Sidebar Subcomponent System** — src_components_ui_sidebar_sidebarmenu, src_components_ui_sidebar_sidebarmenuitem, src_components_ui_sidebar_sidebarmenubutton, src_components_ui_sidebar_sidebarmenusub, src_components_ui_sidebar_sidebarmenusubbutton, src_components_ui_sidebar_sidebarmenusubitem, src_components_ui_sidebar_sidebarmenuaction, src_components_ui_sidebar_sidebarmenubadge, src_components_ui_sidebar_sidebarmenuskeleton [INFERRED 0.90]
- **Sidebar Composition Modules** — src_components_ui_sidebar_sidebarheader, src_components_ui_sidebar_sidebarfooter, src_components_ui_sidebar_sidebarcontent, src_components_ui_sidebar_sidebargroup, src_components_ui_sidebar_sidebarinset, src_components_ui_sidebar_sidebarseparator, src_components_ui_sidebar_sidebarinput [INFERRED 0.85]
- **Field Form Composition Pattern** — src_components_ui_field_fieldset, src_components_ui_field_fieldlegend, src_components_ui_field_fieldgroup, src_components_ui_field_field, src_components_ui_field_fieldcontent, src_components_ui_field_fieldlabel, src_components_ui_field_fieldtitle, src_components_ui_field_fielddescription, src_components_ui_field_fieldseparator, src_components_ui_field_fielderror [INFERRED 0.90]

## Communities (31 total, 21 thin omitted)

### Community 0 - "Sidebar System"
Cohesion: 0.18
Nodes (17): SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset (+9 more)

### Community 1 - "Core App UI"
Cohesion: 0.28
Nodes (13): Findfee Application, Root Layout, Dashboard Page, Login Page, Login Form, Nav User, Signup Form, Avatar UI Component (+5 more)

### Community 2 - "Navigation"
Cohesion: 0.22
Nodes (9): Dashboard Layout, App Sidebar, Nav Main, Nav Projects, NavProjects, Nav Secondary, NavSecondary, NavUser (+1 more)

### Community 3 - "Sheet/Modal"
Cohesion: 0.25
Nodes (9): Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetTitle (+1 more)

### Community 4 - "Sidebar State"
Cohesion: 0.22
Nodes (9): SIDEBAR_COOKIE_NAME, SIDEBAR_KEYBOARD_SHORTCUT, SIDEBAR_WIDTH, SidebarContext, SidebarContextProps, SidebarProvider, getInitialMobile, MOBILE_BREAKPOINT (+1 more)

### Community 5 - "Menu & Tooltip"
Cohesion: 0.33
Nodes (6): SidebarMenuButton, sidebarMenuButtonVariants, SidebarMenuSubButton, Tooltip, TooltipContent, TooltipTrigger

### Community 7 - "Signup Flow"
Cohesion: 0.67
Nodes (3): Home Page, Signup Page, SignupForm

### Community 8 - "Field Labels"
Cohesion: 0.67
Nodes (3): FieldLabel, FieldTitle, Label

### Community 9 - "Separators"
Cohesion: 1.00
Nodes (3): FieldSeparator, Separator, SidebarSeparator

## Knowledge Gaps
- **51 isolated node(s):** `DashboardLayout`, `Page`, `RootLayout`, `LoginPage`, `Home` (+46 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useSidebar` connect `Sidebar System` to `Sheet/Modal`, `Sidebar State`, `Menu & Tooltip`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Why does `Sidebar` connect `Sheet/Modal` to `Sidebar System`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `SidebarContext` connect `Sidebar State` to `Sidebar System`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Findfee Application` (e.g. with `Avatar UI Component` and `Breadcrumb UI Component`) actually correct?**
  _`Findfee Application` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `DashboardLayout`, `Page`, `RootLayout` to the rest of the system?**
  _51 weakly-connected nodes found - possible documentation gaps or missing edges._