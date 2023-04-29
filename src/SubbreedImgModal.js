import React from 'react'

function SubbreedImgModal(props) {
    const {id,subbreedImgurl,abc,breed} =props
    
  return (
    <div
    class="modal fade"
    id={id}
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog ">
      <div class="modal-content shadow-lg p-3 mb-5 bg-body rounded">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
             {abc}-Subbreed of {breed}  Images
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" style={{display:"flex",flexWrap:"wrap",gap:"1rem"}}>
          {subbreedImgurl.map((url)=> <img
            src={url}
            className="img-fluid"
            alt=""
            style={{ width: "100px", height: "100px",borderRadius:"1rem" }}
          />)}
         
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SubbreedImgModal