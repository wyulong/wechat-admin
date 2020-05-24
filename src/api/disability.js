import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/disability/admin/list',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/disability/admin/edit',
    method: 'post',
    data
  })
}

export function deleteDate(data) {
  return request({
    url: '/disability/deleteGraduate',
    method: 'post',
    data
  })
}

