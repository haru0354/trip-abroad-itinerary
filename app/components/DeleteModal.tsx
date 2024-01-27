import React from 'react'
import Button from './Button'

const DeleteModal = () => {
  return (
    <div>
      <div>
        <h3>
          <span>を削除しますか</span>
        </h3>
        <div>
          <Button
          >
            キャンセル
          </Button>
          <Button
          >
            削除
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal