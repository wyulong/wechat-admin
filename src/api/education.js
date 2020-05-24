import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/education/admin/listEducation',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/education/admin/editEducation',
    method: 'post',
    data
  })
}

export function deleteDate(data) {
  return request({
    url: '/education/deleteEducation',
    method: 'post',
    data
  })
}

