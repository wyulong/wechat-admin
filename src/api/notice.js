import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/notice/listNotice',
    method: 'post',
    data
  })
}

export function addData(data) {
  return request({
    url: '/notice/addNotice',
    method: 'post',
    data
  })
}

export function getData(id) {
  return request({
    url: '/notice/getNotice',
    method: 'get',
    params: { id }
  })
}

export function editData(data) {
  return request({
    url: '/notice/editNotice',
    method: 'post',
    data
  })
}

export function deleteDate(data) {
  return request({
    url: '/notice/deleteNotice',
    method: 'post',
    data
  })
}

