import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/poorFamily/admin/list',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/poorFamily/admin/edit',
    method: 'post',
    data
  })
}

export function deleteDate(data) {
  return request({
    url: '/poorFamily/deletePoorFamily',
    method: 'post',
    data
  })
}

