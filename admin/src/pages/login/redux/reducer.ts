// import { PaginationProps } from '@arco-design/web-react/es/Pagination/pagination';
import { LOGIN } from './actionTypes';

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
};

export interface UserLoginState {
  userInfo?: {
    name?: string;
    avatar?: string;
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      const userInfo = {
        ...action.payload,
        avatar: 'https://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
        name: action.payload.userName,
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      state.userInfo = userInfo;
    }
    default:
      return state;
  }
}
