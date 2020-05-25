import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function fetchList(data) {
  return request({
    url: '/user/admin/list',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/user/admin/edit',
    method: 'post',
    data
  })
}

export function deleteDate(data) {
  return request({
    url: '/user/admin/delete',
    method: 'post',
    data
  })
}
