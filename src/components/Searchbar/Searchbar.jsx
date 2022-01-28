
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchSpan,
  SearhInput,
} from "./Searchbar.styled";
import { ReactComponent as SearchIcon } from '../Searchbar/search.svg';



export default function Searchbar({ onSubmit }) {

  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    const { value } = event.currentTarget;
    setQuery(value.toLowerCase() );
  };
  
   const handleSubmit = (event) => {
       event.preventDefault();

    if (query.trim() === "") {
      toast.error("Enter query!");
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return(<SearchbarContainer>
        <header>
          <SearchForm onSubmit={handleSubmit}>
            <SearchFormButton type="submit"><SearchIcon width="20"  height="20" color="blue"
             />
              <SearchSpan>Search</SearchSpan>
            </SearchFormButton>

            <SearhInput
              onChange={handleChange}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={query}
            />
          </SearchForm>
        </header>
      </SearchbarContainer>)
  ;
}



// export default class OldSearchbar extends Component {
//   state = {
//     query: "",
//   };

//   handleChange = (event) => {
//     this.setState({ query: event.currentTarget.value.toLowerCase() });
//       };

//   handleSubmit = (event) => {
//        event.preventDefault();

//     if (this.state.query.trim() === "") {
//       toast.error("Enter query!");
//       return;
//     }
//     this.props.onSubmit(this.state.query);
//     this.setState({ query: "" });
//   };
//   render() {
//     return (
//       <SearchbarContainer>
//         <header>
//           <SearchForm onSubmit={this.handleSubmit}>
//             <SearchFormButton type="submit"><SearchIcon width="20"  height="20" color="blue"
//              />
//               <SearchSpan>Search</SearchSpan>
//             </SearchFormButton>

//             <SearhInput
//               onChange={this.handleChange}
//               type="text"
//               autoComplete="off"
//               autoFocus
//               placeholder="Search images and photos"
//               value={this.state.query}
//             />
//           </SearchForm>
//         </header>
//       </SearchbarContainer>
//     );
//   }
// }
