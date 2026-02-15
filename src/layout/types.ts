export type NavLink = {
  icon?: React.ReactNode | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path?: string;
  title: string;
  disabled?: boolean;
  badgeContent?: string;
  externalLink?: boolean;
  openInNewTab?: boolean;
  badgeColor?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info";
};

export type NavGroup = {
  icon?: React.ReactNode;
  title: string;
  badgeContent?: string;
  children?: (NavGroup | NavLink)[];
  badgeColor?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info";
};

export type NavSectionTitle = {
  sectionTitle: string;
};

export type VerticalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[];
