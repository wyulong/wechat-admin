import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/graduate/admin/list',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/graduate/admin/edit',
    method: 'post',
    data
  })
}

export function deleteDate(data) {
  return request({
    url: '/graduate/deleteGraduate',
    method: 'post',
    data
  })
}

