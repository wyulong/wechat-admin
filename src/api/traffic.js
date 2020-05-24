import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/traffic/admin/list',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/traffic/admin/edit',
    method: 'post',
    data
  })
}

export function deleteDate(data) {
  return request({
    url: '/traffic/deleteTraffic',
    method: 'post',
    data
  })
}

