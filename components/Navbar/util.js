/**
 * Returns the active path for the current option menu.
 * @param router {object<{pathname: string}>} Nextjs router.
 * @param option {object} Menu option.
 * @returns {null|string} The active route path or null.
 */
export const getActiveRoute = (router, option) => {
  if (!router.pathname.startsWith(option?.path)) {
    return null;
  }
  if (option?.children) {
    const activeOption = option?.children.find((item) =>
      router.pathname.startsWith(item.path),
    );
    if (activeOption) {
      return activeOption.path;
    }
  }
  return option?.path;
};
