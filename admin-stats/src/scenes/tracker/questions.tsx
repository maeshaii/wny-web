import React, { useState } from 'react';
import './Tracker.css';
import { FaPlusCircle, FaTrash } from 'react-icons/fa';

interface QuestionItem {
  id: number;
  title: string;
  type: 'text' | 'radio' | 'checkbox' | 'file_upload';
  options: string[];
  value: string | string[];
  required: boolean;
}

interface Category {
  id: number;
  name: string;
  description: string;
  questions: QuestionItem[];
}

const Question: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const addCategory = () => {
    const newCategory: Category = {
      id: Date.now(),
      name: `PART ${categories.length + 1}`,
      description: 'Category Description',
      questions: [],
    };
    setCategories([...categories, newCategory]);
  };

  const updateCategoryDescription = (categoryId: number, value: string) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === categoryId ? { ...cat, description: value } : cat))
    );
  };

  const deleteCategory = (categoryId: number) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const addQuestion = (categoryId: number) => {
    const newQuestion: QuestionItem = {
      id: Date.now(),
      title: '',
      type: 'text',
      options: [],
      value: '',
      required: false,
    };
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, questions: [...cat.questions, newQuestion] }
          : cat
      )
    );
  };

  const deleteQuestion = (categoryId: number, questionId: number) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, questions: cat.questions.filter(q => q.id !== questionId) }
          : cat
      )
    );
  };

  const updateQuestionTitle = (categoryId: number, questionId: number, title: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: cat.questions.map(q =>
                q.id === questionId ? { ...q, title } : q
              ),
            }
          : cat
      )
    );
  };

  const updateQuestionType = (
    categoryId: number,
    questionId: number,
    type: QuestionItem['type']
  ) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: cat.questions.map(q =>
                q.id === questionId
                  ? {
                      ...q,
                      type,
                      options: type === 'radio' || type === 'checkbox' ? q.options : [],
                    }
                  : q
              ),
            }
          : cat
      )
    );
  };

  const handleAnswerChange = (categoryId: number, questionId: number, value: string | string[]) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: cat.questions.map(q => (q.id === questionId ? { ...q, value } : q)),
            }
          : cat
      )
    );
  };

  const updateQuestionOption = (
    categoryId: number,
    questionId: number,
    optionIndex: number,
    value: string
  ) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: cat.questions.map(q =>
                q.id === questionId
                  ? {
                      ...q,
                      options: q.options.map((opt, idx) => (idx === optionIndex ? value : opt)),
                    }
                  : q
              ),
            }
          : cat
      )
    );
  };

  const addQuestionOption = (categoryId: number, questionId: number) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: cat.questions.map(q =>
                q.id === questionId ? { ...q, options: [...q.options, ''] } : q
              ),
            }
          : cat
      )
    );
  };

  const removeQuestionOption = (categoryId: number, questionId: number, optionIndex: number) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: cat.questions.map(q =>
                q.id === questionId
                  ? { ...q, options: q.options.filter((_, idx) => idx !== optionIndex) }
                  : q
              ),
            }
          : cat
      )
    );
  };

  return (
    <div className="tracker-container">
      <div className="tracker-inner">
        <button className="icon-button" onClick={addCategory} style={{ marginBottom: '12px' }}>
          <FaPlusCircle /> Add Part (Category)
        </button>

        {categories.map(category => (
          <div key={category.id} className="card" style={{ marginTop: '16px' }}>
            <div className="card-header">
              <h3>{category.name}</h3>
              <button className="icon-button delete" onClick={() => deleteCategory(category.id)}>
                <FaTrash /> Delete
              </button>
            </div>

            <label>Description</label>
            <input
              className="question-input"
              type="text"
              value={category.description}
              onChange={e => updateCategoryDescription(category.id, e.target.value)}
              placeholder="Category description"
            />

            <button className="icon-button" onClick={() => addQuestion(category.id)}>
              <FaPlusCircle /> Add Question
            </button>

            {category.questions.map(q => (
              <div key={q.id} className="question-card">
                <label>Question Title</label>
                <input
                  className="question-input"
                  type="text"
                  value={q.title}
                  onChange={e => updateQuestionTitle(category.id, q.id, e.target.value)}
                  placeholder="Enter question title"
                />

                {q.type === 'text' && (
                  <input
                    className="question-input"
                    type="text"
                    placeholder={q.title || 'Your answer'}
                    value={typeof q.value === 'string' ? q.value : ''}
                    onChange={e => handleAnswerChange(category.id, q.id, e.target.value)}
                  />
                )}

                {q.type === 'file_upload' && (
                  <input
                    type="file"
                    onChange={e =>
                      handleAnswerChange(category.id, q.id, e.target.files?.[0]?.name || '')
                    }
                  />
                )}

                {q.type === 'radio' && (
                  <div className="option-group">
                    {q.options.map((opt, idx) => (
                      <label key={idx}>
                        <input
                          type="radio"
                          name={`radio-${category.id}-${q.id}`}
                          checked={q.value === opt}
                          onChange={() => handleAnswerChange(category.id, q.id, opt)}
                        />{' '}
                        {opt}
                      </label>
                    ))}
                  </div>
                )}

                {q.type === 'checkbox' && (
                  <div className="option-group">
                    {q.options.map((opt, idx) => (
                      <label key={idx}>
                        <input
                          type="checkbox"
                          checked={Array.isArray(q.value) && q.value.includes(opt)}
                          onChange={e => {
                            const checked = e.target.checked;
                            let current = Array.isArray(q.value) ? [...q.value] : [];
                            if (checked) {
                              current.push(opt);
                            } else {
                              current = current.filter(v => v !== opt);
                            }
                            handleAnswerChange(category.id, q.id, current);
                          }}
                        />{' '}
                        {opt}
                      </label>
                    ))}
                  </div>
                )}

                <label>Question Type</label>
                <select
                  className="question-type"
                  value={q.type}
                  onChange={e =>
                    updateQuestionType(category.id, q.id, e.target.value as QuestionItem['type'])
                  }
                >
                  <option value="text">Text</option>
                  <option value="radio">Radio</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="file_upload">File Upload</option>
                </select>

                {(q.type === 'radio' || q.type === 'checkbox') && (
                  <div>
                    <strong>Options:</strong>
                    {q.options.map((opt, idx) => (
                      <div key={idx} className="option-row">
                        <input
                          className="question-input"
                          type="text"
                          value={opt}
                          onChange={e => updateQuestionOption(category.id, q.id, idx, e.target.value)}
                        />
                        <button
                          className="icon-button delete"
                          onClick={() => removeQuestionOption(category.id, q.id, idx)}
                        >
                          <FaTrash /> Remove
                        </button>
                      </div>
                    ))}
                    
                    <button className="icon-button" onClick={() => addQuestionOption(category.id, q.id)}>
                      <FaPlusCircle /> Add Option
                    </button>
                  </div>
                )}

                <button className="icon-button delete" onClick={() => deleteQuestion(category.id, q.id)}>
                  <FaTrash /> Delete Question
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
