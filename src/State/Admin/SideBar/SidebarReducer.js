const initialState = {
  sidebar: { isOpen: true },
};

function sidebarReducer(state = initialState.sidebar, action) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

export default sidebarReducer;
