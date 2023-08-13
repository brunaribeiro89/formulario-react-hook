
import { render, screen} from '@testing-library/react'
import "@testing-library/jest-dom";
import { FormComponent } from '.';
import { mock } from 'node:test';

describe('Jest', ()=>{
  it('should work', ()=>{
    expect(1).toBe(1)
  })

  it('should visible', ()=>{
    const mockToggle = mock.fn()
   const resultcomponent =  render(<FormComponent onClick={mockToggle} open={true}/>)
    expect(resultcomponent.baseElement).toBeInTheDocument()
    expect(resultcomponent.baseElement).toBeVisible()
})
it('not should visible', () => {
  const mockToggle = mock.fn()
 const resultcomponent =  render(<FormComponent onClick={mockToggle} open={false}/>)
  expect(resultcomponent.baseElement).toBeInTheDocument()
  

})

})


