type BreadcrumbItem = {
  id: string | null;
  name: string | null;
};

export type BreadcrumbType = Record<"currentFolder" | "parentFolderName" | "grandParentFolderName", BreadcrumbItem>;
