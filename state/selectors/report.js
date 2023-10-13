export const selectReportStatus = (state) => state.report.status;
export const selectReportsResolved = (state) => state.report.reportsResolved;
export const selectReportsUnResolved = (state) =>
  state.report.reportsUnResolved;
export const selectReport = (state) => state.report.report;
export const selectPageSizeResolved = (state) => state.report.pageSizeResolved;
export const selectPagePageResolved = (state) => state.report.pagePageResolved;
export const selectPageSizeNoResolved = (state) =>
  state.report.pageSizeNoResolved;
export const selectPagePageNoResolved = (state) =>
  state.report.pagePageNoResolved;
