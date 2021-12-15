// 接口前缀
export const API_PREFIX = 'api';
// 无需权限URL前缀
export const NO_PERM_PREFIX = 'common';
// 无需校验TOKEN的URL
export const PUBLIC_PREFIX = 'public';

export const TEACHER_ROLE = {
  GET: { '/api/teacher/course/page': 1 },
  POST: {
    '/api/teacher/course/bindCourseware': 1,
    '/api/common/editor/courseware/add': 1,
    '/api/common/editor/resource2d/add': 1,
  },
  DELETE: { '/api/common/editor/courseware': 1 },
};
