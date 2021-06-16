import React from 'react'
import * as loadingStyle from './styles/dataloading.module.css'

function DataLoading() {
    return (
        <div>
            <div className={loadingStyle.ring}>Loading
  <span></span>
</div>
        </div>
    )
}

export default DataLoading
