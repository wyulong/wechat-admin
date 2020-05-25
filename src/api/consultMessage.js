import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/consultMessage/admin/list',
    method: 'post',
    data
  })
}

export function editData(data) {
  return request({
    url: '/consultMessage/admin/edit',
    method: 'post',
    data
  })
}

export function deleteDate(data) {
  return request({
    url: '/consultMessage/deleteConsultMessage',
    method: 'post',
    data
  })
}

