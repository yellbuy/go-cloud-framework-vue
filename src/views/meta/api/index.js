import depChild from '/@/mock/meta/depChild.json';
import depRoot from '/@/mock/meta/depRoot.json';
import mockConf from '/@/mock/meta/mockConf.json';
import userData from '/@/mock/meta/userData.json';
// 获取组织机构根节点
export const GET_DEPT_ROOT = () => new Promise((resolve, reject) => {
    resolve(depRoot);
});

// 根据部门id获取分页人员信息
export const GET_PAGE_EMPLOYEE = data => new Promise((resolve, reject) => {
    resolve(userData);
});

// 获取组织机构子节点
export const GET_DEPT_TREE = data => new Promise((resolve, reject) => {
    resolve(depChild);
});

// 获取组织机构下人员信息
export const GET_USER_BY_DEPT = data => new Promise((resolve, reject) => {
    resolve(userData);
});

// 获取Mock数据
export const GET_MOCK_CONF = () => new Promise((resolve, reject) => {
    resolve(mockConf);
});
