import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/complainMessage/admin/list',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/complainMessage/admin/edit',
    method: 'post',
    data
  })
}

export function deleteDate(data) {
  return request({
    url: '/complainMessage/deleteComplainMessage',
    method: 'post',
    data
  })
}

