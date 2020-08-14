export const SET_USER_NAVIGATION = "SET_USER_NAVIGATION";

const getfilteredNavigations = (navList = [], role) => {
  return navList.reduce((array, nav) => {
    if (nav.auth) {
      if (nav.auth.includes(role)) {
        return [...array, nav];
      }
    } else {
      if (nav.children) {
        return [
          ...array,
          { ...nav, children: getfilteredNavigations(nav.children, role) },
        ];
      }
      return [...array, nav];
    }
    return array;
  }, []);
};

export function getNavigationByUser() {
  return (dispatch, getState) => {
    const { user, navigations = [] } = getState();

    const filteredNavigations = getfilteredNavigations(navigations, user.role);

    dispatch({
      type: SET_USER_NAVIGATION,
      payload: filteredNavigations,
    });
  };
}
